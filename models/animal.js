"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    static findAvailable() {
      return Animal.findAll({ where: { status: "tersedia" } });
    }

    static associate(models) {
      Animal.belongsTo(models.Farm, {
        foreignKey: "farmId",
      });
      Animal.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: "animalId",
      });
    }
  }
  Animal.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama hewan tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Nama hewan tidak boleh kosong",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Jenis hewan tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Jenis hewan tidak boleh kosong",
          },
          isIn: {
            args: [["sapi", "kambing", "domba"]],
            msg: "Jenis hewan harus salah satu dari Sapi, Kambing, Domba",
          },
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Berat hewan tidak boleh kosong",
          },
          isFloat: {
            args: true,
            msg: "Berat hewan harus berupa angka",
          },
          min: {
            args: [20],
            msg: "Berat minimal hewan 20 kg",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Umur hewan tidak boleh kosong",
          },
          isInt: {
            args: true,
            msg: "Umur hewan harus berupa angka",
          },
          min: {
            args: [1],
            msg: "Umur minimal hewan 1 tahun",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Harga tidak boleh kosong",
          },
          isInt: {
            args: true,
            msg: "Harga hewan harus berupa angka",
          },
          min: {
            args: [1500000],
            msg: "Harga minimal Rp 1.500.000 ",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "tersedia",
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Status tidak boleh kosong",
          },
          isIn: {
            args: [["tersedia", "terjual"]],
            msg: "Status hewan harus tersedia atau terjual",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Animal",
      hooks: {
        afterCreate: async (animal) => {
          if (animal.status === "terjual") {
            await animal.update({ status: "terjual" });
          }
        },
      },
    },
  );
  return Animal;
};
