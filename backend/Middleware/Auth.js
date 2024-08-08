// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   // Extract the token from the cookies
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: "You are not authenticated" });
//   } else {
//     jwt.verify(token,'your_jwt_secret', (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: "Token is not valid" });
//       } else {
//         req.id = decoded.id; // Attach user ID to the request object
//         console.log(req.id); // Optional: log the user ID for debugging purposes
//         next(); // Proceed to the next middleware or route handler
//       }
//     });
//   }
// };


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // or `req.headers.authorization` if using Bearer token

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
