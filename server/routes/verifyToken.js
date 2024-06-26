//routes/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).send('Access Denied. Token not provided.');
  }

  const token = tokenHeader.split(' ')[1]; // Extract the token
  if (!token) return res.status(401).send('Access Denied. Invalid token format.');

  try {
    const verified = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log('Decoded Token:', verified); // Log the decoded token
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;