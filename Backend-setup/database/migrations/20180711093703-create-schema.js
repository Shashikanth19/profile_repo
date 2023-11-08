module.exports = {
  async up(queryInterface , sequelize) {
    await queryInterface.createSchema("backend")
  },
  async down(queryInterface) {
    await queryInterface.dropSchema("backend")
  }
}