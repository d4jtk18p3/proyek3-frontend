'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TataUsaha', {
      id_tataUsaha: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nip: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      nama : {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    await queryInterface.createTable('MataKuliah', {
      id_mata_kuliah: {
        type: Sequelize.STRING(8),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      semester: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nama_mata_kuliah: {
          type: Sequelize.STRING(50),
          allowNull: false  
      },
      sks_teori: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      sks_praktek:{
          type: Sequelize.INTEGER,
          allowNull: true
      }
    });
    await queryInterface.createTable('Kelas', {
      id_kelas:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      kode_kelas: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kelas');
    await queryInterface.dropTable('MataKuliah');
    await queryInterface.dropTable('TataUsaha');
  }
};