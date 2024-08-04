const { Teacher, Student } = require('../models');
const { hash } = require('bcrypt');

const seedDatabase = async () => {
  await Teacher.bulkCreate([
    {
      name: 'Teacher One', // Changed from username to name
      email: 'teacher1@example.com',
      password: await hash('examplepassword', 10)
    },
    {
      name: 'Teacher Two', // Changed from username to name
      email: 'teacher2@example.com',
      password: await hash('examplepassword', 10)
    }
  ]);

  await Student.bulkCreate([
    {
      name: 'Student One',
      grade: 90,
      teacher_id: 1
    },
    {
      name: 'Student Two',
      grade: 85,
      teacher_id: 2
    }
  ]);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
