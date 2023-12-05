const express = require("express");

const router = express.Router();

const branch = require('./branch');
const designations = require('./designations');
const customers = require('./customers');

branch(router);
designations(router);
customers(router);

module.exports = router;