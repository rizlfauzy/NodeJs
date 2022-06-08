const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_product_category = require("./dn_product_category");

const Dn_product_master = dino.define(
  "dn_product_master",
  {
    pm_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pm_code: {
      type: Sequelize.STRING,
    },
    pm_displayname: {
      type: Sequelize.STRING,
    },
    sa_id: {
      type: Sequelize.INTEGER,
    },
    pc_id: {
      type: Sequelize.INTEGER,
    },
    pc_displaydesc: {
      type: Sequelize.STRING,
    },
    pm_icon: {
      type: Sequelize.STRING,
    },
    pm_popularity: {
      type: Sequelize.INTEGER,
    },
    pc_status: {
      type: Sequelize.INTEGER,
    },
  },
  { freezeTableName: true, timestamps: false }
);
Dn_product_category.hasMany(Dn_product_master, { foreignKey: "pc_id" });
Dn_product_master.belongsTo(Dn_product_category, { foreignKey: "pc_id" });

module.exports = Dn_product_master;