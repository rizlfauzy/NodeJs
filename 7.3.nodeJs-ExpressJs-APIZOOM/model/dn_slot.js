const Sequelize = require("sequelize");
const { dino } = require("../utils/db");

const Dn_slot = dino.define(
  "dn_slot",
  {
    sl_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sl_start: {
      type: Sequelize.TIME,
    },
    sl_end: {
      type: Sequelize.TIME,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Dn_slot;
