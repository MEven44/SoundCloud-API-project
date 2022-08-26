'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.addColumn('Users', 
      'firstName', { 
      type: Sequelize.STRING,
      
      });
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('Users');
     
  }
};
