const Sequelize = require("sequelize");
const { dino } = require("../utils/db");

const Dn_notaris = dino.define(
  "dn_notaris",
  {
    n_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    n_certificate: {
      type: Sequelize.STRING,
    },
    n_name: {
      type: Sequelize.STRING,
    },
    n_email: {
      type: Sequelize.STRING,
    },
    n_phone: {
      type: Sequelize.STRING,
    },
    n_address: {
      type: Sequelize.STRING,
    },
    n_photo: {
      type: Sequelize.STRING,
    },
    n_password: {
      type: Sequelize.STRING,
    },
    n_resume: {
      type: Sequelize.STRING,
    },
    n_rating: {
      type: Sequelize.INTEGER,
    },
    n_joindate: {
      type: Sequelize.DATE,
    },
    kp_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    // freezeTableName: true,
    timestamps: false,
  }
);


module.exports = Dn_notaris;
