// models/user.js

const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');

// Define User schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    CreatedOn: { type: Date, default: Date.now }},
    { timestamps: true });

// Generate authentication token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, { expiresIn: '7d' });
    console.log('Generated token:', token); // Log the generated token
    return token;
};

// Create User model
const User = mongoose.model('user', userSchema);

// Validate user data
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    });
    return schema.validate(data);
};

// Export User model and validate function
module.exports = { User, validate };