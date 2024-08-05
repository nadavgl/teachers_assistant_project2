const router = require('express').Router();
const { Student } = require('../models');

// Create a student
router.post('/', async (request, response) => {
  const formData = request.body;
  try {
    const student = await Student.create(formData)
    response.json({
      message: 'Student created Sucessfully',
      student: student
    })
  } catch (error) {
    const errors = error.errors.map((errObj) => {
      return {
        message: errObj.message
      }
    })
    response.json(errors)
  }
})

// Update student
router.put('/:student_id', async (req, res) => {
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

// Get One student by id
router.get('/:student_id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);

router.put('student/:student_id', async (req, res) => {
  const student = await Student.findByPk(
    
  )
})


// Delete student
router.delete('/remove/:student_id', async (req, res) => {
  await Student.destroy({
    where: {
      id: req.params.student_id
    }
  })
  res.redirect('/dashboard');
})

module.exports = router;