"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static findUserById(userId) {
      return UserProfile.findOne({
        where: {
          userId,
        },
      });
    }
    get displayName() {
      return this.fullName || "Pengguna QurbanIn";
    }

    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserProfile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: {
            args: true,
            msg: "Nomor telepon harus berupa angka",
          },
          len: {
            args: [10, 13],
            msg: "Nomor telepon harus 10-13 digit",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    },
  );
  return UserProfile;
};
