const router = require('express').Router();
const { Student } = require('../models');

// Create a student
router.post('/add', async (req, res) => {
  const formData = req.body;
  try {
    await Student.create({
      ...formData,
      teacherId: req.session.teacher_id
    })
    res.redirect('/dashboard')
  } catch (error) {
    console.log('add error', error);
    const errors = error.errors.map((errObj) => {
      return {
        message: errObj.message
      }
    })
    res.redirect('/add')
  }
})

// Update student
router.put('/edit/:student_id', async (req, res) => {
  await Student.update(
    req.body,
    {
      where: {
        id: req.params.student_id
      },
      returning: true,
      plain: true
    }
  )
  res.redirect('/dashboard')
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