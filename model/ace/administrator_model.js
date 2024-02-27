const Sequelize = require("sequelize");
const db = require("./../../utils/database_connection");

const Administrator = db.define(
  "Administrator",
  {
    UserId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    Password: {
      type: Sequelize.DataTypes.STRING,
    },
    FirstName: {
      type: Sequelize.DataTypes.STRING,
    },
    LastName: {
      type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "Administrator",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

module.exports = Administrator;