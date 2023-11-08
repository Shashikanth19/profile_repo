const {
    save,
  } = require("../controllers/branch");
    
  module.exports = (router) => {
    router.post('/branch', save);
  
  };
  