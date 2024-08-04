const router = require('express').Router();
const { Teacher, Student } = require('../../models');



// Create a student
router.post('/students', async (request, response) => {
    const formData = request.body;
    try {
        const student = await Student.create(formData)
        response.json({
            message: 'Student created Sucessfully',
            student: student
        })
    } catch (error) {
        const errors =error.errors.map((errObj) =>{
            return {
                message: errObj.message
            }
        })
        response.json(errors)
    }


})

// Get all students
  router.get('/students', async (req, res) => {
    const students = await Student.findAll()
    // const plainData = students.map(studentObj => studentObj.get({ plain: true }));
    
    // console.log(plainData[2].course.course_name)
    res.json(students)
});

// Update student
router.put('/student/:student_id', async (req, res) => {
    const student = await Student.update(
      req.body,
      {
        where: {
          id: req.params.student_id
        },
        returning: true,
        plain: true
      }
    )
    res.json(student[1])
  })
  

// Delete student

router.delete('/student/:student_id', async (req, res) =>{
    await Student.destroy({
      where:{
        id: req.params.student_id
      }
    })
    res.json({
      message: 'Student deleted succesfully'
    })
  })
  
  module.exports = router;