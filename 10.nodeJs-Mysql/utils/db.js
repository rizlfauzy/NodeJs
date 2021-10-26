const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
const { PORT, HOST, HOST_URL } = process.env;

const dino = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

//untuk tersinkronasi dengan table bawaan jika sudah ada
dino.sync().then(() => console.log("syncronized", process.env.NODE_ENV));
module.exports = {
  dino, PORT,HOST,HOST_URL
};
