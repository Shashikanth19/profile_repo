const saveCustomers = require('./save-customers');
const getCustomersList = require('./get-customers-list');
const updateCustomers = require('./update-customers');
const updateCustomersStatus = require('./update-customers-status');
const getCustomerStatsByStatus = require('./get-customer-stats-by-status');

module.exports = {
    saveCustomers,
    getCustomersList,
    updateCustomers,
    updateCustomersStatus,
    getCustomerStatsByStatus
}