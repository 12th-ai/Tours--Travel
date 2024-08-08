// controllers/tourController.js
const Tour = require('../models/Tour');
const redisClient = require('../config/redis'); // Adjust the path to your Redis configuration

// Helper function to cache data
const cacheMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const cacheData = await redisClient.get(`tour:${id}`);
  if (cacheData) {
    return res.json(JSON.parse(cacheData));
  }
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTourById = [cacheMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    await redisClient.set(`tour:${id}`, JSON.stringify(tour), 'EX', 3600); // Cache for 1 hour
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.createTour = async (req, res) => {
  try {
    const { title, location, description, time, price, place, tourDetail, gallery } = req.body;
    const newTour = await Tour.create({ title, location, description, time, price, place, tourDetail, gallery });
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, time, price, place, tourDetail, gallery } = req.body;
    const [updated] = await Tour.update({ title, location, description, time, price, place, tourDetail, gallery }, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    const updatedTour = await Tour.findByPk(id);
    await redisClient.set(`tour:${id}`, JSON.stringify(updatedTour), 'EX', 3600); // Update cache
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tour.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    await redisClient.del(`tour:${id}`); // Delete from cache
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
