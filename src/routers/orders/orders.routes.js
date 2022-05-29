const express = require('express');

const {
  createOrder,
} = require('../../controllers/orders.controllers');

const router = express.Router();

router.route('/')
  .post(createOrder);

module.exports = router;