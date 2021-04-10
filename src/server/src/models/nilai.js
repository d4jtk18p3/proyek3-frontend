const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Nilai = sequelize.define("nilai", {
    nilai_semester: {
        type: Sequelize.STRING(2),
    },
});

module.exports = Nilai;