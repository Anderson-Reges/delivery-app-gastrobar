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
    models.Sale.hasMany(saleProduct, { foreignKey: 'sale_id', as: 'sales' });
    models.Product.hasMany(saleProduct, { foreignKey: 'product_id', as: 'products' });
  };

  return saleProduct;
};