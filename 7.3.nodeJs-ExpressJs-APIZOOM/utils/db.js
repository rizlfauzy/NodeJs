const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, PORT, HOST, HOST_URL } = process.env;

//konek database
const dino = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

//untuk sinkronasi
dino.sync();
module.exports = {
  dino,
  PORT,
  HOST,
  HOST_URL,
};
