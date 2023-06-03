"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Meja Kayu",
          quantity: 100,
        },
        {
          name: "Lemari Besi",
          quantity: 20,
        },
        {
          name: "Meja Tembaga",
          quantity: 10,
        },
        {
          name: "Meja Seng",
          quantity: 25,
        },
        {
          name: "Meja Fiber",
          quantity: 50,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
