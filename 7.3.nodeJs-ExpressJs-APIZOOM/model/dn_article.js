const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_notaris = require("./dn_notaris");

const Dn_article = dino.define(
  "dn_article",
  {
    a_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    a_title: {
      type: Sequelize.TEXT,
    },
    a_kontent: {
      type: Sequelize.CHAR,
    },
    a_photo: {
      type: Sequelize.CHAR,
    },
    a_views: {
      type: Sequelize.INTEGER,
    },
    a_date: {
      type: Sequelize.DATE,
    },
    n_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Dn_notaris.hasMany(Dn_article, { foreignKey: "n_id" });
Dn_article.belongsTo(Dn_notaris, { foreignKey: "n_id" });
module.exports = Dn_article;
