const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_product_master = require("./dn_product_master");
const Dn_notaris = require("./dn_notaris");

const Dn_notaris_services = dino.define(
  "dn_notaris_services",
  {
    n_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    pm_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);
Dn_product_master.hasMany(Dn_notaris_services, { foreignKey: "pm_id" });
Dn_notaris_services.belongsTo(Dn_product_master, { foreignKey: "pm_id" });

Dn_notaris.hasMany(Dn_notaris_services, { foreignKey: "n_id" });
Dn_notaris_services.belongsTo(Dn_notaris, { foreignKey: "n_id" });

module.exports = Dn_notaris_services;
