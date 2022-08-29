"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(Playlist, { through: playlistSong });
      Song.belongsTo(User, { foreignKey: userId });
      Song.belongsTo(Album, { foreignKey: albumId });
    }
  }
  Song.init(
    {
      albumId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
