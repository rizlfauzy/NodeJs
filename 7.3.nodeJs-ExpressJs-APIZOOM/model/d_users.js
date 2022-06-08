const Sequelize = require("sequelize");
const { dino } = require("../utils/db");

const D_users = dino.define(
  "d_users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    user_status: {
      type: Sequelize.INTEGER,
    },
    user_gender: {
      type: Sequelize.STRING,
    },
    user_photo: {
      type: Sequelize.INTEGER,
    },
    user_phone: {
      type: Sequelize.INTEGER,
    },
    user_login: {
      type: Sequelize.INTEGER,
    },
    user_passwd: {
      type: Sequelize.INTEGER,
    },
    user_verification: {
      type: Sequelize.STRING,
    },
    fcm: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = D_users;
