const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt')

const sequelize = require('../config/connection');


class Teacher extends Model { 
 async validatePassword(formPassword){
    const is_valid = await compare(formPassword, this.password)

    return is_valid
  }
}

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
    modelName: 'teacher',
    hooks: {
      async beforeCreate(teacher){
        teacher.password = await hash (teacher.password, 10)

        return teacher
      }
    }
  }
);

module.exports = Teacher;