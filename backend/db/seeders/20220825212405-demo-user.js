'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Users', 
     [{email: 'musician@user.io',
       username: 'Beethoven',
       hashedPassword: bcrypt.hashSync('password')      
     },
      {email: 'listener@user.io',
       username: 'Bobby-Brown',
       hashedPassword: bcrypt.hashSync('Nopassword')      
     },]
     );
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Users');
     
  }
};
