module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTERGER,
      seller_id: DataTypes.INTERGER,
      total_price: DataTypes.DECIMAL,
      delivery_address: DataTypes.STRING,
      delivery_number: DataTypes.STRING,
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING
    },
    { timestamps: false }
  );

  Sale.associate = (models) => {
    models.User.hasMany(Sale, { foreignKey: 'user_id', as: 'user' });
    models.User.hasMany(Sale, { foreignKey: 'saller_id', as: 'saller' });
  };

  return Sale;
};