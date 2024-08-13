const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { sequelize } = require("./config/database");
const path = require('path');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cookieParser());

// Middleware for parsing URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Ensure this is called before routes

// Security and CORS
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handlers
const testimonialRoutes = require('./Router/testimonialRoutes');
const authRoutes = require("./Router/UserRouter");
const destinationRoutes = require('./Router/destination'); // Adjust path if necessary
const gallaryRouter = require('./Router/Gallery')


app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/gallery',gallaryRouter);

const tourGuideRoutes = require('./Router/tourGuideRoutes');
app.use('/api/tour-guides', tourGuideRoutes);


const tourPackageRoutes = require('./Router/tourPackageRoutes');
app.use('/api/tour-guides', tourPackageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack); // Detailed error stack
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sync Database and start server
const PORT = process.env.PORT || 3000;





sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((error) => console.error('Database sync error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
