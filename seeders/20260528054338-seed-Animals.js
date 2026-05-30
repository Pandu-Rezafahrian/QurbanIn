'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Animals', [
      {
        name: 'Sapi Jantan Besar',
        type: 'sapi',
        weight: 350,
        age: 3,
        price: 18000000,
        status: 'tersedia',
        imageUrl: 'link gambar',
        farmId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kambing Jantan Premium',
        type: 'kambing',
        weight: 35,
        age: 2,
        price: 3500000,
        status: 'tersedia',
        imageUrl: 'link gambar',
        farmId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Domba Jantan Garut',
        type: 'domba',
        weight: 40,
        age: 2,
        price: 4000000,
        status: 'tersedia',
        imageUrl: 'link gambar',
        farmId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Animals', null, {});
  }
};
