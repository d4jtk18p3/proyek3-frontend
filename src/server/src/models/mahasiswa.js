const Sequelize = require("sequelize");

const Mahasiswa = sequelize.define("mahasiswa", {
    id_mahasiswa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    NIM: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nama_mahasiswa: {
        type: Sequelize.STRING,
    },
    angaktan: {
        type: Sequelize.INTEGER,
    },
    tingkat: {
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    },
    nomor_hp: {
        type: Sequelize.STRING,
    },
    url_foto: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
});

module.export = Mahasiswa;