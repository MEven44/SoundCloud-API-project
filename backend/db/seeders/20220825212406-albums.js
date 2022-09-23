'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert("Albums", [
      {
        userId: 1,
        title: "water songs",
        description: "fun disco gay song",
        imageUrl:
          "https://www.diamonddotz.com/image/cache/catalog/products/main/dq9/dq9.013-400x400.jpg",
      },
      {
        userId: 2,
        title: "fire songs",
        description: "amazing",
        imageUrl:
          "https://sc04.alicdn.com/kf/Hb114307f8e89436a891218945167923e5.jpg",
      },
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Albums');
     
  }
};

