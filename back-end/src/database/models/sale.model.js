module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING
    },
    { timestamps: false, underscored: true, tableName: 'sales' }
  );

  Sale.associate = (models) => {
    models.User.hasMany(Sale, { foreignKey: 'user_id', as: 'user' });
    models.User.hasMany(Sale, { foreignKey: 'saller_id', as: 'saller' });
  };

  return Sale;
};