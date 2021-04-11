'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menjabat', {
        jabatan: {
        type: Sequelize.STRING(16)
        },
        periode: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
        });
    await queryInterface.createTable('Ormawa', {
        id_ormawa: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        nama_ormawa: {
        type: Sequelize.STRING(30)
        },
        url_logo_ormawa: {
            type: Sequelize.STRING(30)
        }
        }); 
        await queryInterface.createTable('Mewakilkan', {
        tahun_mulai: {
            type: Sequelize.STRING(4)
        },
        tahun_berakhir: {
            type: Sequelize.STRING(4)
        },
        status_aktif: {
            type: Sequelize.BOOLEAN
        },
        });
        await queryInterface.createTable('Memimpin', {
        tahun_mulai: {
            type: Sequelize.STRING(4)
        },
        tahun_berakhir: {
            type: Sequelize.STRING(4)
        },
        });
},
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Menjabat');
        await queryInterface.dropTable('Ormawa');
        await queryInterface.dropTable('Mewakilkan');
        await queryInterface.dropTable('Memimpin');
  }
};