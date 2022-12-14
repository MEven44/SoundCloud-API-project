"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
const playlist = require("./playlist");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, firstName, lastName, email } = this;
      return { id, username, firstName, lastName, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Song, { foreignKey: "userId" });
      User.hasMany(models.Album, { foreignKey: "userId" });
      User.hasMany(models.Playlist, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNoEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [3, 256],
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },

      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["email", "hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] },
        },
        loginUser: {
          // attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"]},
        },
      },
    }
  );
  return User;
};
