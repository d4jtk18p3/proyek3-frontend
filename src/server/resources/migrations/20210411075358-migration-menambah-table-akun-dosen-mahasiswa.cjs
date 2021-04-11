'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Akun', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        },
        tipe_akun: {
            type: Sequelize.STRING
        }
      });
      await queryInterface.createTable('Dosen', {
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
      await queryInterface.createTable('Mahasiswa', {
        id_mahasiswa: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        NIM: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        nama_mahasiswa: {
            type: Sequelize.STRING
        },
        angaktan: {
            type: Sequelize.INTEGER
        },
        tingkat: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        nomor_hp: {
            type: Sequelize.STRING
        },
        url_foto: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Akun');
    await queryInterface.dropTable('Dosen');
    await queryInterface.dropTable('Mahasiswa');
  }
};
