//routes/user.js
const { User } = require('../models/user');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const Token = require('../models/Token');
const { validate } = require('../models/user');

const sendEmail = require('../utils/SendEmail');
const crypto = require('crypto');

// User registration route
router.post('/', async (req, res) => {
    try {
        console.log('Received registration request:', req.body);

        // Validate request and check if user already exists
        const{ error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({email: req.body.email});

        if(user) return res.status(409).send('User with given email already registered');

        // Hash password and create new user
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await new User({...req.body, password: hashedPassword}).save();
        console.log('User object after saving:', user);


        const token = await new Token({
            userId: user._id,
            token:crypto.randomBytes(32).toString('hex')}).save();
            console.log('Generated token:', token.token);

            const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
            const emailContent = `Please click on the link to verify your email address: ${url}`;
            const htmlContent = `
                <p>Thank you for joining Waste To Taste! Please click on the link below to verify your email address and get started creating your own recipes:</p>
                <a href="${url}">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p><p> </p>
                <p>Thank you,</p>
                <p>Waste To Taste Team</p>
                <p>wastetotaste222@gmail.com</p>
            `;
            
            await sendEmail(user.email, "Verify Email", emailContent, htmlContent);


        // Send success response
        res.status(201).send('An Email has been sent to your account. Please click on the link to verify your email.');
    } catch (error) {   
        // Handle errors
        console.log(error.message);
        res.status(500).send("Internal Server Error...");
    }
});
router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send({message: "Invalid link. The user does not exist."});
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({message: "Invalid link or expired token."});
        }

        // Proceed with verification only if the user hasn't been verified yet
        if (!user.verified) {
            user.verified = true;
            await user.save();
            await Token.deleteOne({ _id: token._id }); // Correctly delete the token

            res.status(200).send({message: "Email verified successfully."});
        } else {
            // Handle already verified user
            await Token.deleteOne({ _id: token._id }); // Clean up any existing token
            res.status(200).send({message: "Email already verified."});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...");
    }
});
router.post('/getProfile', async (req, res) => {
    const { email } = req.body;
    User.findOne({ email })
      .then((profile) => {
        if (!profile) return res.status(404).send('User not found');
        res.json(profile);
      })
      .catch((err) =>
        res.status(500).json({ error: 'Failed to fetch profile' })
      );
  });
  

  router.post('/update-profile', async (req, res) => {
    const { firstName, lastName, newEmail, password, email: currentEmail } = req.body;

    try {
        let user = await User.findOne({ email: currentEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Initialize the update object
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        // Note: Direct email update is deferred until verification

        // Check if password was provided before hashing
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Perform the update for firstName, lastName, and (hashed) password
        await User.findOneAndUpdate({ email: currentEmail }, updateData, { new: true });

        if (newEmail && newEmail !== currentEmail) {
            // Check if the new email is already used by another account
            const emailExists = await User.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(409).send('The email is already in use by another account.');
            }

            // Generate and send a verification token for the new email
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex'),
                    newEmail // Store the new email in the token for verification
                });
            } else {
                token.token = crypto.randomBytes(32).toString('hex');
                token.newEmail = newEmail;
            }
            await token.save();

            const url = `${process.env.BASE_URL}/users/verify-new-email/${token.token}`;
            await sendEmail(newEmail, "Verify your new email address", `
                <p>Please click on the link below to verify your new email address and complete the update:</p>
                <a href="${url}">${url}</a>
            `);

            return res.status(200).send({message: "A verification email has been sent to your new email address. Please verify to complete the update."});
        } else {
            // If no email change, just confirm the update
            res.json({ success: true, message: 'Profile updated successfully', user: updateData });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Internal Server Error');
    }
});


// New route to verify the new email
router.get('/verify-new-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const tokenDoc = await Token.findOne({ token });
        if (!tokenDoc || !tokenDoc.newEmail) return res.status(400).send('Invalid or expired token.');

        const userUpdate = await User.findByIdAndUpdate(tokenDoc.userId, { email: tokenDoc.newEmail }, { new: true });
        await Token.findByIdAndDelete(tokenDoc._id);

        if (!userUpdate) {
            return res.status(404).send('User not found.');
        }

        res.send('Your email has been updated successfully.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error...');
    }
});
router.delete('/delete-profile', async (req, res) => {
    const email = req.body.email;
  
    try {
      const user = await User.findOneAndDelete({ email: email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// GET route to fetch all users
router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords from the result
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send('Internal Server Error');
    }
});
// GET route to fetch a single user's details by email
router.get('/user-details/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email }, '-password -__v'); // Exclude the password and __v field
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});




module.exports = router;