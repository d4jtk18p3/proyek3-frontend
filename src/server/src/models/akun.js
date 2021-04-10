const Sequelize = require("sequelize");

const Akun = sequelize.define("akun", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    tipe_akun: {
        type: Sequelize.STRING,
    },
});

module.export = Akun;