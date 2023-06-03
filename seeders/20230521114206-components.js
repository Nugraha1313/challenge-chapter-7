"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Components",
      [
        {
          name: "Kayu",
          description: "Merupakan Kayu",
        },
        {
          name: "Besi",
          description: "Merupakan Besi",
        },
        {
          name: "Tembaga",
          description: "Merupakan Tembaga",
        },
        {
          name: "Seng",
          description: "Merupakan Seng",
        },
        {
          name: "Fiber",
          description: "Merupakan Fiber",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Components", null, {});
  },
};
