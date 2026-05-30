"use strict";
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@qurbanin.com",
        password: await bcrypt.hash("Admin123!", 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "pembeli1@gmail.com",
        password: await bcrypt.hash("Pembeli123!", 10),
        role: "pembeli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "pembeli2@gmail.com",
        password: await bcrypt.hash("Pembeli123!", 10),
        role: "pembeli",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
