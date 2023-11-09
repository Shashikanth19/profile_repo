const express = require("express");

const router = express.Router();

const branch = require('./branch');
const designations = require('./designations');

branch(router);
designations(router);

module.exports = router;