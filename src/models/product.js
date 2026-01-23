const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('products', 'root', 'Primo!18', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

const ProductModel = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  rate: { type: DataTypes.FLOAT, defaultValue: 0 },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = { sequelize, ProductModel };