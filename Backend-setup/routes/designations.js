const { save } = require('../controllers/designations');

module.exports = (router) => {
    router.post("/designations", save)
}