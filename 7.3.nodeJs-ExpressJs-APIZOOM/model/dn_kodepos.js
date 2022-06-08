const Sequelize = require('sequelize');
const { dino } = require('../utils/db');

const Dn_kodepos = dino.define(
  "dn_kodepos",
  {
    kp_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kp_kodepos: {
      type: Sequelize.STRING,
    },
    kp_tingkat1: {
      type: Sequelize.STRING,
    },
    kp_tingkat2: {
      type: Sequelize.STRING,
    },
    kp_tingkat3: {
      type: Sequelize.STRING,
    },
    kp_tingkat4: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Dn_kodepos;
