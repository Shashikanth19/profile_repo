const branch = require('./branch');
const designations = require('./designations');
const customers = require('./customers');

module.exports = {
    ...branch,
    ...designations,
    ...customers,
    
}