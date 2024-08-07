const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token is not valid" });
      } else {
        req.id = decoded.id; // Attach user ID to the request object
        console.log(req.id); // Optional: log the user ID for debugging purposes
        next(); // Proceed to the next middleware or route handler
      }
    });
  }
};
