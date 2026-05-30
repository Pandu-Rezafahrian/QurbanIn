'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Farms', [
      {
        name: 'Kandang Berkah Jaya',
        location: 'Cirebon, Jawa Barat',
        description: 'Kandang hewan kurban terpercaya dengan hewan pilihan berkualitas tinggi',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peternakan Al-Barokah',
        location: 'Bandung, Jawa Barat',
        description: 'Spesialis hewan kurban sapi dan kambing dengan sertifikat kesehatan',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kandang Maju Bersama',
        location: 'Kuningan, Jawa Barat',
        description: 'Hewan kurban sehat dan terawat langsung dari peternak lokal',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Farms', null, {});
  }
};
