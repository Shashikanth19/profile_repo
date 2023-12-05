const {
  save,
  update,
  getList,
  updateStatus,
  getCustomerByMobile,
  getCustomerStatsByStatus,
} = require("../controllers/customers");

// const isAuthorized = require('../services/firebase/authenticate');

module.exports = (router) => {
  router.post("/customers", 
  // isAuthorized("supplier", "admin"),
   save);
  router.patch(
    "/customers/:publicId",
    // isAuthorized("supplier", "admin"),
    update
  );
  router.get("/customers",
  //  isAuthorized("supplier", "admin"),
    getList);
  router.patch(
    "/update-customers-status/:publicId",
    // isAuthorized("supplier", "admin"),
    updateStatus
  );
  router.get(
    "/customer-by-mobile/:mobileNo",
    // isAuthorized("supplier", "admin"),
    getCustomerByMobile
  );
  router.get(
    "/customer-stats-by-status/:status",
    // isAuthorized("supplier", "admin"),
    getCustomerStatsByStatus
  );
};
