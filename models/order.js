"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static findByUser(userId) {
      return Order.findAll({
        where: { userId },
      });
    }

    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
      });
      Order.belongsToMany(models.Animal, {
        through: models.OrderItem,
        foreignKey: "orderId",
      });
    }

    get itemCount() {
      return this.OrderItems ? this.OrderItems.length : 0;
    }
  }
  Order.init(
    {
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Total harga tidak boleh kosong",
          },
          isInt: {
            args: true,
            msg: "Total harga harus berupa angka",
          },
          min: {
            args: [0],
            msg: "Total harga tidak boleh negatif",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          notNull: {
            args: true,
            msg: "Status tidak boleh kosong",
          },
          notEmpty: {
            args: true,
            msg: "Status tidak boleh kosong",
          },
          isIn: {
            args: [["pending", "confirmed", "cancelled"]],
            msg: "Status harus pending, confirmed, atau cancelled",
          },
        },
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notNull: {
            args: true,
            msg: "Tanggal order tidak boleh kosong",
          },
          isDate: {
            args: true,
            msg: "Format tanggal tidak valid",
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
      modelName: "Order",
    },
  );
  return Order;
};
