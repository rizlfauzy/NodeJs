const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_notaris = require("./dn_notaris");
const D_users = require("./d_users");
const Dn_schedule = require("./dn_schedule");
const Dn_product_master = require("./dn_product_master");

const Dn_notaris_booking = dino.define(
  "dn_notaris_booking",
  {
    nb_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nb_status: {
      type: Sequelize.INTEGER,
    },
    nb_cancel_date: {
      type: Sequelize.DATE,
    },
    nb_cancel_reason: {
      type: Sequelize.STRING,
    },
    n_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    sc_id: {
      type: Sequelize.INTEGER,
    },
    pm_id: {
      type: Sequelize.INTEGER,
    },
    nb_book_date: {
      type: Sequelize.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Dn_notaris.hasMany(Dn_notaris_booking, { foreignKey: "n_id" });
Dn_notaris_booking.belongsTo(Dn_notaris, { foreignKey: "n_id" });

D_users.hasMany(Dn_notaris_booking, { foreignKey: "user_id" });
Dn_notaris_booking.belongsTo(D_users, { foreignKey: "user_id" });

Dn_schedule.hasMany(Dn_notaris_booking, { foreignKey: "sc_id" });
Dn_notaris_booking.belongsTo(Dn_schedule, { foreignKey: "sc_id" });

Dn_product_master.hasMany(Dn_notaris_booking, { foreignKey: "pm_id" });
Dn_notaris_booking.belongsTo(Dn_product_master, { foreignKey: "pm_id" });

module.exports = Dn_notaris_booking;
