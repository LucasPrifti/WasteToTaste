const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html) => {
    if (!email) {
        console.error('sendEmail error: Email address is missing or invalid.');
        return;
    }
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.SECURE === 'true',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
            html: html || text // Use HTML content if provided; otherwise, fallback to text
        });

        console.log("Email Successfully sent.");
    } catch (error) {
        console.error("Error sending Email...", error);
    }
};
