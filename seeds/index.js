const { Teacher, Student } = require('../models');
const { hash } = require('bcrypt');
const client = require('../config/connection')

const seedDatabase = async () => {
  await Teacher.bulkCreate([
    {
      name: 'Teacher One',
      email: 'teacher1@example.com',
      password: await hash('examplepassword', 10)

    },
    {
      name: 'Teacher Two',
      email: 'teacher2@example.com',
      password: await hash('examplepassword', 10)
    }
  ]);

  await Student.bulkCreate([
    {
      name: 'Student One',
      grade: '1st Grade',
      bus_number: '1',
      teacherId: 1,
      notes: 'has peanut allergy'
    },
    {
      name: 'Student Two',
      grade: 85,
      bus_number: '1',
      teacherId: 2,
      notes: 'has 1:1 aide'
    }
  ]);


  console.log('Database seeded!');
  process.exit(0);
};
client.sync({ force: true }).then(seedDatabase)

