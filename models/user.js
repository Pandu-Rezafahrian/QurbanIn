"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, {
        foreignKey: "userId",
      });
      User.hasMany(models.Farm, {
        foreignKey: "userId",
      });
      User.hasMany(models.Order, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            args: true,
            msg: "Format Email tidak valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          len: {
            args: [8, 16],
            msg: "Minimal password 8 karakter, maksimal password 16 karakter",
          },
          passwordValidation(value) {
            if (!/[A-Z]/.test(value)) {
              throw new Error(
                "Password harus mengandung minimal satu huruf besar",
              );
            }
            if (!/[a-z]/.test(value)) {
              throw new Error(
                "Password harus mengandung minimal satu huruf kecil",
              );
            }
            if (!/[0-9]/.test(value)) {
              throw new Error("Password harus mengandung minimal satu angka");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
              throw new Error(
                "Password harus mengandung minimal satu karakter spesial",
              );
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pembeli",
        validate: {
          notNull: {
            args: true,
            msg: "Role tidak boleh kosong",
          },
          isIn: {
            args: [["admin", "pembeli"]],
            msg: "Role harus salah satu dari: admin atau pembeli",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },

        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    },
  );
  return User;
};
