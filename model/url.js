const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//Extending the class Model with Url

class Url extends Model {}

Url.init(
  {
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Url",
  }
);

module.exports = Url;
