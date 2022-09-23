'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert("Songs", [
        {
          albumId: 1,
          userId: 1,
          title: "fly",
          description: "this bird can fly",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          imageUrl:
            "https://image.made-in-china.com/2f0j00TRBGZsSMAApD/Beautiful-Cocks-Diamond-Painting-Square-5D-Gemstone-Art-Painting-on-Canvas-.jpg",
        },
        {
          albumId: 2,
          userId: 1,
          title: "on the lake",
          description: "original material",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1486/9868/products/yangtze-store-large-square-silk-scarf-classic-painting-waterlilies-by-monet-szd215-13721857359937.jpg?v=1582757679",
        },
      ]);
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Songs');
     
  }
};
