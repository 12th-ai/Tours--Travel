const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./Routers/AuthRouter');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
app.use(express.json());

// middleware use 
app.use(bodyParser.json());
app.use(cookieParser());

// use router 
app.use('/api/users', userRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
