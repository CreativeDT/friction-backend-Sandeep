const Sequelize = require("sequelize");
const db = require("../utils/database_connection");

const Supplier = db.define(
  "Supplier",
  {
    SupplierId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SupplierName: {
      type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "Supplier",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

module.exports = Supplier;
