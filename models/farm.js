"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    static findUserById(userId) {
      return Farm.findAll({
        where: {
          userId,
        },
      });
    }

    get farmInfo() {
      return `${this.name} - ${this.location}`;
    }

    static associate(models) {
      Farm.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Farm.hasMany(models.Animal, {
        foreignKey: "farmId",
      });
    }
  }
  Farm.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama kandang tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Nama kandang tidak boleh kosong",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Lokasi kandang tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Lokasi kandang tidak boleh kosong",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Deskripsi tidak boleh kosong",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Farm",
    },
  );
  return Farm;
};
