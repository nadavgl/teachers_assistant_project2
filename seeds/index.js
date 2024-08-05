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
      grade: 90,
      teacherId: 1
    },
    {
      name: 'Student Two',
      grade: 85,
      teacherId: 2
    }
  ]);
  

  console.log('Database seeded!');
  process.exit(0);
};
client.sync({force:true}).then(seedDatabase)

