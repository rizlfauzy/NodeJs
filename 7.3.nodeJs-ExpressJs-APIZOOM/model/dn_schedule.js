const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_slot = require("./dn_slot");

const Dn_schedule = dino.define(
  "dn_schedule",
  {
    sc_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sc_date: {
      type: Sequelize.DATEONLY,
    },
    sc_available: {
      type: Sequelize.SMALLINT,
    },
    n_id: {
      type: Sequelize.INTEGER,
    },
    sl_id: {
      type: Sequelize.INTEGER,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Dn_slot.hasMany(Dn_schedule, { foreignKey: "sl_id" });
Dn_schedule.belongsTo(Dn_slot, { foreignKey: "sl_id" });

module.exports = Dn_schedule;
