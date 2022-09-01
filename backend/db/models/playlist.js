'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Playlist.belongsToMany(models.Song, { through: 'playlistSong' });
       Playlist.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};