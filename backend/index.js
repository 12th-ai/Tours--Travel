const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require('path');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const { sequelize } = require("./config/database");

dotenv.config();

const app = express();

// Middleware for security and CORS
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Rate limiting middleware to limit requests from the same IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handlers
const testimonialRoutes = require('./Router/testimonialRoutes');
const authRoutes = require("./Router/UserRouter");
const destinationRoutes = require('./Router/destination');
const galleryRouter = require('./Router/Gallery');
const summaryRoute = require('./Router/summary');
// const UserCount = require('./Router/UserRouter'); 
const tourGuideRoutes = require('./Router/tourGuideRoutes');
const tourPackageRoutes = require('./Router/tourPackageRoutes');

app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/gallery', galleryRouter);
app.use('/api/tour-guides', tourGuideRoutes);
app.use('/api/tour-packages', tourPackageRoutes);
app.use('/api', authRoutes);
app.use('/api',summaryRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack); // Detailed error stack
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sync Database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch((error) => console.error('Database sync error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
