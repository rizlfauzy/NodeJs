const Sequelize = require("sequelize");
const { dino } = require("../utils/db");

const Dn_Product_Category = dino.define(
  "dn_product_category",
  {
    pc_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    pc_code: {
      type: Sequelize.STRING,
    },
    pc_displayname: {
      type: Sequelize.STRING,
    },
    pc_displaydesc: {
      type: Sequelize.STRING,
    },
    pc_icon: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Dn_Product_Category
