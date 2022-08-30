'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert(
        "Songs",
        [
          {
            albumId: 1,
            userId: 1,
            title: "time to rest",
            description: "original material",
            url: "https://soundcloud.com/moran-even/now-i-can-rest",
            imageUrl: null,
          },
          {
            albumId: 2,
            userId: 1,
            title: "on the lake",
            description: "original material",
            url: 'https://soundcloud.com/moran-even/the-big-fish',
            imageUrl: null,
          },
        ],
        
      );
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Songs');
     
  }
};
