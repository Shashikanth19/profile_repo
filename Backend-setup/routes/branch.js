const {
  save,
  generatePDFController,
  // update, getList, updateStatus,getListStatus
} = require("../controllers/branch");

// const isAuthorized = require('../services/firebase/authenticate');

module.exports = (router) => {
  router.post("/branch", save);
  router.get(
    "/generate-pdf",
    //  isAuthorized("supplier", "admin"),
    generatePDFController
  );
  // router.patch('/branch/:publicId', isAuthorized('Branch','update'), update);
  // router.get('/branch', isAuthorized('Branch', 'read'), getList);
  // router.patch('/branch-status-update/:publicId', isAuthorized('Branch','update'), updateStatus);
  // router.get('/branch-status', isAuthorized('Branch', 'read'), getListStatus);
};
