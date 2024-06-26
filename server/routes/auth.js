//routes/auth.js
const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Assuming JWT is used for token generation
const Token = require('../models/Token');
const sendEmail = require('../utils/SendEmail');
const crypto = require('crypto');
require('dotenv').config(); // Ensure environment variables are loaded

// Assuming your environment variables are named ADMIN_EMAIL and ADMIN_HASHED_PASSWORD
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Login route
router.post('/', async (req, res) => {
    try {
       // Admin check
if (req.body.email === ADMIN_EMAIL) {
    // If storing the admin password in plaintext in the environment variable
    if (req.body.password === ADMIN_PASSWORD) {
        // Assuming admin has a separate method or logic to generate an auth token
        const adminToken = jwt.sign(
            { email: ADMIN_EMAIL, role: 'admin' },
            process.env.PRIVATE_KEY,
            { expiresIn: '1h' }
        );
        return res.status(200).send({ data: adminToken, message: "Admin logged in successfully!", role: 'admin' });
    } else {
        return res.status(401).send({ message: 'Invalid credentials for admin.' });
    }
}


        // Validate request data
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: 'The Selected Email is Invalid.' });

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: 'The Selected Password is Invalid.' });

        // Check if user is verified
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save();
                const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }
            return res.status(400).send({ message: "An Email has been sent to your account. Please click on the link to verify your email." });
        }

        // Generate and send token for regular user
        const token = user.generateAuthToken(); // Assuming this method exists and works as intended
        res.status(200).send({ data: token, message: "Logged in successfully!", role: 'user' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: "Internal Server Error..." });
    }
});

// Validate user data
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(data);
};

module.exports = router;
