const Sequelize = require("sequelize");
const db = require("../utils/database_connection");
const userModel = require("./user_model");
const activityModel = require("./activity_model");

const Bookmark = db.define(
  "Bookmark",
  {
    BookmarkId: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IsBookMarked: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    IsActive: {
      type: Sequelize.DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: "Bookmark",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  },
);

Bookmark.belongsTo(activityModel, { foreignKey: "ActivityId" });
Bookmark.belongsTo(userModel, { foreignKey: "UserId" });

module.exports = Bookmark;
