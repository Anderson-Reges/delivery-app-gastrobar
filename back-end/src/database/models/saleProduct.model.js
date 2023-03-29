module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTERGER,
      quantity: DataTypes.INTERGER,
    },
    { timestamps: false }
  );

  saleProduct.associate = (models) => {
    models.Sale.hasMany(saleProduct, { foreignKey: 'sale_id', as: 'sales' });
    models.Product.hasMany(saleProduct, { foreignKey: 'product_id', as: 'products' });
  };

  return saleProduct;
};