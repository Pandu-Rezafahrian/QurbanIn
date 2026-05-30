"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static findByOrder(orderId) {
      return OrderItem.findAll({
        where: {
          orderId,
        },
      });
    }
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
      });
      OrderItem.belongsTo(models.Animal, {
        foreignKey: "animalId",
      });
    }
  }
  OrderItem.init(
    {
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
            msg: "Harga harus berupa angka",
          },
          min: {
            args: [1500000],
            msg: "Harga minimal Rp 1.500.000",
          },
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Order tidak boleh kosong",
          },
        },
      },
      animalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Hewan tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      hooks: {
        afterCreate: async (orderItem) => {
          const { Animal } = require("./index");
          await Animal.update(
            {
              status: "terjual",
            },
            {
              where: {
                id: orderItem.animalId,
              },
            },
          );
        },
      },
    },
  );
  return OrderItem;
};
