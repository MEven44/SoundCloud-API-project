'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert("Users", [
       {
         email: "musician@user.io",
         username: "Beethoven",
         firstName: "be",
         lastName: "hoven",
         hashedPassword: bcrypt.hashSync("password"),
       },
       {
         email: "listener@user.io",
         username: "Bobby-Brown",
         firstName: "booby",
         lastName: "brown",
         hashedPassword: bcrypt.hashSync("Nopassword"),
       },
       {
         email: "trex@user.io",
         username: "trex-Brown",
         firstName: "rtx-booby",
         lastName: "t-brown",
         hashedPassword: bcrypt.hashSync("Nopassword"),
       },
     ]);
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Users');
     
  }
};
