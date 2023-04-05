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
    models.Sale.hasMany(saleProduct, { foreignKey: 'saleId', as: 'sales' });
    models.Product.hasMany(saleProduct, { foreignKey: 'productId', as: 'products' });
  };

  return saleProduct;
};