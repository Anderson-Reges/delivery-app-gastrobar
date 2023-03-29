module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.INTEGER,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false }
  );

  return User;
};