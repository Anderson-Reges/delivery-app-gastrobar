module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTERGER,
      quantity: DataTypes.INTERGER,
    },
    { 
      timestamps: false,
      tableName: 'sales_products',
      underscored: true
    }
  );

  saleProduct.associate = (models) => {
    models.Sale.hasMany(saleProduct, { foreignKey: 'sale_id', as: 'sales' });
    models.Product.hasMany(saleProduct, { foreignKey: 'product_id', as: 'products' });
  };

  return saleProduct;
};