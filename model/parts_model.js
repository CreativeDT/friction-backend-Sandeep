const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const supplierModel = require("./supplier_model");

const Parts = db.define(
  "Parts",
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    PartsId: {
      type: Sequelize.DataTypes.INTEGER,
    },
    SupplierPart: {
      type: Sequelize.DataTypes.STRING,
    },
    Description: {
      type: Sequelize.DataTypes.STRING,
    },
    PartNumber: {
      type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "Parts",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

Parts.belongsTo(supplierModel, {foreignKey: "SupplierId"});

module.exports = Parts;
