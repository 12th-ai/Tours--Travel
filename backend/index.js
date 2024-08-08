const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./Routers/AuthRouter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
app.use(express.json());

// middleware use 
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',  // Update with your client's origin
  credentials: true,
}));

const tourRoutes = require('./Routers/TourRouter'); // Adjust the path to your routes

// use router 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(bodyParser.json());

app.use('/api/tours', tourRoutes);

app.use('/api/users', userRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
