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
       Playlist.hasMany(models.PlaylistSong, {foreignKey: 'playlistId'})
       Playlist.belongsTo(models.User, {foreignKey: 'userId'})
       Playlist.belongsToMany(models.Song, {through: models.PlaylistSong,
         foreignKey: "playlistId",
         otherKey: "songId",
       });
       Playlist.hasMany(models.PlaylistSong, { foreignKey: "playlistId" });
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    imageUrl: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};