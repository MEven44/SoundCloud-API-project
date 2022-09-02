'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Songs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key:'id'
        },
        onDelete: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users', 
          key:'id'
        },
        onDelete:'cascade'
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};