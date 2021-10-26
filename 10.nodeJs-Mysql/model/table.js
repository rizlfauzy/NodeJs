const Sequelize = require("sequelize");
const {dino} = require("../utils/db");

const Contact = dino.define(
  "contact",
  {
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
    },
    noHp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Contact;
