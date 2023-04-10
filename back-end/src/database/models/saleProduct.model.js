module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, primaryKey: true },
      productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    { 
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    },
  );

  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: saleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    models.SaleProduct.belongsTo(models.Product, {
      as: 'product',
      through: models.Product,
      foreignKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: saleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }

  return saleProduct;
};