'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Playlists', 
   [{
      userId:1,
      name: 'happy morning',
  },
    {
      userId:2,
      name:'quiet evening'
    }], );
  
  },

  async down (queryInterface, Sequelize) {
   
  
     await queryInterface.bulkDelete('Playlists', null);
     
  }
};
