const router = require('express').Router();
const { Teacher } = require('../models');

// Register User
router.post('/register', async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    req.session.teacher_id = teacher.id;

    res.redirect('/dashboard');
  } catch (error) {
    const errors = error.errors.map(errObj => errObj.message);

    req.session.errors = errors;
    res.redirect('/register');
  }
});

// Log In User
router.post('/login', async (req, res) => {
  const formData = req.body;
  // Grap the user by the form email that was provided
  const teacher = await Teacher.findOne({
    where: {
      email: formData.email
    }
  });

  // If they do not exist in the database, then stop everything and redirect them to register
  if (!teacher) {
    req.session.errors = ['A teacher with that email address does not exist'];
    return res.redirect('/register');
  }

  // Check to see if they gave us the correct password
  const valid_pass = await teacher.validatePassword(formData.password);
  if (!valid_pass) {
    req.session.errors = ['Password is invalid'];
    return res.redirect('/login');
  }

  // Log in the user by creating a session
  req.session.teacher_id = teacher.id;
console.log(teacher.id)
  // Ensuring that the session data has been saved before we redirect them
  req.session.save((err) => {
    if (err) return console.log('session error', err);

    res.redirect('/dashboard');
  });
});

// Log Out User
router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;