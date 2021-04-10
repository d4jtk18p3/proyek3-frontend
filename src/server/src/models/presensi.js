const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Presensi = sequelize.define("presensi", {
    tipe_presensi: {
        type: Sequelize.STRING(10),
    },
});

module.exports = Presensi;