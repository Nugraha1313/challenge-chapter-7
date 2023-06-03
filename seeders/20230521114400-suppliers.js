'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert(
  "Suppliers",
  [
    {
      name: "PT. Budi Kayu",
      address: "Jl. Kayu No. 1",
    },
    {
      name: "PT. Freya Besi",
      address: "JL. Besi No. 2",
    },
    {
      name: "PT. Tembaga Makmur Jaya",
      address: "Jl. Tembaga No. 3",
    },
    {
      name: "PT. Seng Sengaja",
      address: "JL. Rahmat wahyudi no. 4",
    },
    {
      name: "PT. Fiber Sentosa",
      address: "JL. Fiber no. 5",
    },
  ],
  {}
);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
