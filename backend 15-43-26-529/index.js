const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { sequelize } = require("./config/database");
const User = require('./models/User'); // Import the User model

const authRoutes = require("./Routes/auth");
const cors = require("cors");

dotenv.config();

const app = express();

// Use Helmet to set secure HTTP headers
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    withCredentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Sync Database
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((error) => console.error('Database sync error:', error));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));