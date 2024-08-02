const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model { }

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 2
            }
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelname: 'student'
    }

)


module.exports = Student;