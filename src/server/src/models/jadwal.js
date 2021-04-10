const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Jadwal = sequelize.define("jadwal", {
    id_jadwal: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    waktu_mulai: {
        type: Sequelize.DATE,
    },
    waktu_selesai: {
        type: Sequelize.DATE,
    },
});

module.exports = Jadwal;