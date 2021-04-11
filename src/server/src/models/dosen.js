const Sequelize = require("sequelize");

const Dosen = sequelize.define("dosen", {
    NIP: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nama_dosen: {
        type: Sequelize.STRING
    },
    jabatan: {
        type: Sequelize.STRING
    }
});

module.export = Dosen;