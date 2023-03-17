"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("posts", "edited", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("posts", "reverted", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("posts", "blinded", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.changeColumn("users", "rank", {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    });
    await queryInterface.changeColumn("users", "rankPoint", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.changeColumn("users", "role", {
      type: Sequelize.STRING(20),
      defaultValue: "None",
    });
    await queryInterface.changeColumn("users", "country", {
      type: Sequelize.STRING(30),
      defaultValue: "None",
    });
    await queryInterface.changeColumn("users", "website", {
      type: Sequelize.STRING(200),
      defaultValue: "None",
    });
    await queryInterface.changeColumn("users", "about", {
      type: Sequelize.STRING(50),
      defaultValue: "",
    });
    await queryInterface.changeColumn("users", "realname", {
      type: Sequelize.STRING(30),
      defaultValue: "",
    });
    await queryInterface.changeColumn("users", "address", {
      type: Sequelize.STRING(50),
      defaultValue: "",
    });
    await queryInterface.changeColumn("users", "reported", {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    });
    await queryInterface.changeColumn("users", "banned", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
