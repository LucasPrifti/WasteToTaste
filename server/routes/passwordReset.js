// Import necessary modules and dependencies
const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/Token");
const sendEmail = require("../utils/SendEmail");
const Joi = require("joi");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

// Endpoint to initiate the password reset process by sending an email link
router.post("/", async (req, res) => {
	try {
		// Validate the email input using Joi
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// Check if the user exists in the database
		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist! Please try again." });

		// Check for an existing password reset token or create a new one
		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		// Generate the password reset link and send it via email
		const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
		 const emailContent = `Please click on the link to verify your email address: ${url}`;
            const htmlContent = `
                <p>Thank you for being a member of Waste To Taste! Please click on the link below to reset your password:</p>
                <a href="${url}">Change Password</a>
                <p>If you did not make this request, please ignore this email.</p><p> </p>
                <p>Thank you for your loyalty,</p>
                <p>Waste To Taste Team</p>
                <p>wastetotaste222@gmail.com</p>
            `;
            
            await sendEmail(user.email, "Password Reset", emailContent, htmlContent);


		res
			.status(200)
			.send({ message: "A Password reset link has been sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Endpoint to verify the password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		// Validate the existence of the user and the token
		const user = await User.findOne({ _id: req.params.id });
		if (!user) 
        return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) 
        return res.status(400).send({ message: "Invalid link" });

		// Confirm the link is valid
		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Endpoint to set a new password
router.post("/:id/:token", async (req, res) => {
	try {
		// Validate the new password's complexity
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// Confirm the user and token validity again
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
        if (!user.verified) user.verified = true;
        
		// Update the user's password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();
        await Token.deleteOne({ _id: token._id }); 

		// Confirm the password reset process is complete
		res.status(200).send({ message: "Password reset successfully. Please hold, as we redirect you to the Login Page." });
	} catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// Export the router for use in the main app file
module.exports = router;
