'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncremente: true,
        primaryKey: true,
      },
      name: Sequelize.STRING(255),
      email: Sequelize.STRING(255),
      password: Sequelize.STRING(255),
      role: Sequelize.STRING(255),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
