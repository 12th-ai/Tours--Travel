const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { sequelize } = require("./config/database");
const authRoutes = require("./Router/UserRouter");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

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
