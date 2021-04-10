const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Prodi = sequelize.define("prodi", {
    kode_prodi: {
        type: Sequelize.STRING(15),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Prodi;