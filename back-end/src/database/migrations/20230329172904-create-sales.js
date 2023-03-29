'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncremente: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        reference: {
          model: 'users',
          key: 'id',
        }
      },
      saller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        reference: {
          model: 'users',
          key: 'id',
        }
      },
      total_price: Sequelize.DECIMAL(9,2),
      delivery_address: Sequelize.STRING(100),
      delivery_number: Sequelize.STRING(50),
      sale_date: Sequelize.DATE,
      status: Sequelize.STRING(50),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
