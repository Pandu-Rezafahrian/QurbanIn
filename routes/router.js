const express = require('express');
const router = express.Router();
const { User, Animal, Farm, Order, OrderItem, UserProfile } = require('../models');
const bcrypt = require('bcryptjs');

// Routing Starts Here

module.exports = router;