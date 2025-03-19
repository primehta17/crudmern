const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const authenticate = require('../middleware/authMiddleware');

// Get all items
router.get('/', authenticate, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create an item
router.post('/', authenticate, async (req, res) => {
  const { name } = req.body;
  const newItem = await Item.create({ name });
  res.status(201).json(newItem);
});

// Delete an item
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.status(200).json({ message: 'Item deleted' });
});

module.exports = router;
