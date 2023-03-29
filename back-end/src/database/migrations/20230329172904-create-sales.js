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
      total_price: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
