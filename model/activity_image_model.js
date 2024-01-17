const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const activityModel = require("./activity_model");
const activityImageTypeModel = require("./activity_image_type_model");

const ActivityImage = db.define(
  "ActivityImage",
  {
    ActivityImageId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ImageUrl: {
        type: Sequelize.DataTypes.STRING,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "ActivityImage",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

ActivityImage.belongsTo(activityModel, {foreignKey: "ActivityId"});
ActivityImage.belongsTo(activityImageTypeModel, {foreignKey: "ActivityImageTypeId"});

module.exports = ActivityImage;
