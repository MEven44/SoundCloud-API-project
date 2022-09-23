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
          "https://c8.alamy.com/comp/2HW15H8/art-inspired-by-sample-of-cloth-old-kingdom-dynasty-6-ca-23532323-bc-from-egypt-memphite-region-saqqara-pyramid-of-king-pepi-i-mummy-chamber-linen-10-cm-square-classic-works-modernized-by-artotop-with-a-splash-of-modernity-shapes-color-and-value-eye-catching-visual-impact-on-art-emotions-through-freedom-of-artworks-in-a-contemporary-way-a-timeless-message-pursuing-a-wildly-creative-new-direction-artists-turning-to-the-digital-medium-and-creating-the-artotop-nft-2HW15H8.jpg",
      },
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Albums');
     
  }
};

