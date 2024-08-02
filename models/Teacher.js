const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Teacher extends Model { }

// create fields/columns for teacher model
Teacher.init(
  {
    // not necessary
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: 2
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true (unnecessary),
      // validate: {
      //   len: 8
      // }
    }
  },
  {
    sequelize,
    // timestamps: false,
    freezeTableName: true,
    modelName: 'teacher'
  }
);

module.exports = Teacher;