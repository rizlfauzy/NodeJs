const Sequelize = require("sequelize");
const { dino } = require("../utils/db");
const Dn_product_master = require("./dn_product_master");

const Dn_drafting_legal_document = dino.define(
  "dn_drafting_legal_document",
  {
    draft_document_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    pm_id: { type: Sequelize.INTEGER },
    draft_document_name: { type: Sequelize.STRING },
    draft_document_pob: { type: Sequelize.STRING },
    draft_document_dob: { type: Sequelize.DATEONLY },
    draft_document_addr: { type: Sequelize.STRING },
    draft_document_ktp: { type: Sequelize.STRING },
    draft_document_phone: { type: Sequelize.STRING },
    draft_document_name2: { type: Sequelize.STRING },
    draft_document_pob2: { type: Sequelize.STRING },
    draft_document_dob2: { type: Sequelize.DATEONLY },
    draft_document_addr2: { type: Sequelize.STRING },
    draft_document_ktp2: { type: Sequelize.STRING },
    draft_document_phone2: { type: Sequelize.STRING },
    draft_document_location: { type: Sequelize.STRING },
    draft_document_total_price: { type: Sequelize.DECIMAL },
    draft_document_dp_price: { type: Sequelize.DECIMAL },
    draft_document_dp_date: { type: Sequelize.DATEONLY },
    draft_document_settlement_price: { type: Sequelize.DECIMAL },
    draft_document_settlement_date: { type: Sequelize.DATEONLY },
    draft_document_period: { type: Sequelize.STRING },
    draft_document_start_date: { type: Sequelize.DATEONLY },
    draft_document_end_date: { type: Sequelize.DATEONLY },
    draft_document_purpose: { type: Sequelize.STRING },
    user_id: { type: Sequelize.INTEGER },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Dn_product_master.hasMany(Dn_drafting_legal_document, { foreignKey: "pm_id" });
Dn_drafting_legal_document.belongsTo(Dn_product_master, { foreignKey: "pm_id" });

module.exports = Dn_drafting_legal_document;
