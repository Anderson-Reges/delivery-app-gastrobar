'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncremente: true,
        primaryKey: true,
      },
      name: Sequelize.STRING(100),
      price: Sequelize.DECIMAL(4,2),
      url_image: Sequelize.STRING(200),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
