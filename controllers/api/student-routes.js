const router = require('express').Router();
const { Student } = require('../../models')

router.get('/stduents', async (req, res) => {
  
    try {
      const students = await Student.findAll()
      res.json(students)
    } catch (error) {
      console.log('error', error)
      res.status(500).json(error)
    }
  });
  
  router.post('/students', async (req, res) => {
    const formData = req.body;
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


});

router.put('/student/:id', async (req, res) => {
    const student = await Student.update(
      req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      }
    )
    res.json(student[1])
  })



module.exports = router

