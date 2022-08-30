'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "raining fella",
        description: "fun disco gay song",
        imageUrl: null,
      },
      {
        userId: 2,
        title: "9th symhony",
        description: "amazing",
        imageUrl: null,
      },
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Albums');
     
  }
};

