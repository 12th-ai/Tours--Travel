// middlewares/validators/tourValidator.js
const { body } = require('express-validator');

exports.validateTour = [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('time').isISO8601().withMessage('Time must be a valid date'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('place').notEmpty().withMessage('Place is required'),
  body('tourDetail').notEmpty().withMessage('Tour detail is required'),
  body('gallery').optional().isArray().withMessage('Gallery must be an array'),
];
