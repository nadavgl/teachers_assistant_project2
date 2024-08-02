const Teacher = require('./Teacher');
const Student = require('./Student');


Teacher.hasMany(Student, {
    foreignKey: 'teacher_id'
});

Student.belongsTo(Teacher, {
    foreignKey: 'student_id'
});

module.exports = { Teacher, Student };