const router = require('express').Router();
const { Teacher, Student } = require('../models');


// router.get('/', async (req, res) => {
//     res.render('homepage');
// })

// router.get('/register', async (req, res) => {
//     res.render('register');
// })

// router.get('/login', async (req, res) => {
//     res.render('login');
// })

// router.get('/dashboard', async (req, res) => {
//     res.render('dashboard');
// })

// router.get('/student_profile', async (req, res) => {
//     res.render('student_profile');
// })



function redirectIfLoggedIn(req, res, next) {
  if (req.session.teacher_id) {
    return res.redirect('/dashboard');
  }

  next();
}

function redirectGuest(req, res, next) {
  if (!req.session.teacher_id) {
    return res.redirect('/login');
  }

  next();
}

// Landing Page Route
router.get('/', redirectIfLoggedIn, async (req, res) => {
  res.render('homepage', {
    title: 'Teacher Assistant Home',
    landing: true
  });
});

// Login Page Route
router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login', {
    title: 'Teacher Assistant - Log In',
    errors: req.session.errors,
    login: true
  });

  delete req.session.errors;
});

// Register Page Route
router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register', {
    title: "Teacher's Assistant - Register",
    errors: req.session.errors,
    register: true
  });

  delete req.session.errors;
});

// Student Page Route
router.get('/dashboard', redirectGuest, async (req, res) => {
  const teacher = await Teacher.findByPk(req.session.teacher_id, {
    attributes: ['name'],
    include: Student
  });

  res.render('dashboard', {
    teacher: teacher.get({ plain: true }),
    title: 'Teacher Assistant - Student',
    user_page: true,
    dashboard: true
  });
});

//show the form to add student
router.get('/add', redirectGuest, async (req, res) => {
  const teacher = await Teacher.findByPk(req.session.teacher_id, {
    attributes: ['name']
  });

  res.render('add', {
    teacher: teacher.get({ plain: true }),
    title: 'Teacher Assistant - Add Student',
    user_page: true,
    add: true
  });
});

// Search Page Route
router.get('/edit/:student_id', redirectGuest, async (req, res) => {
  const teacher = await Teacher.findByPk(req.session.teacher_id, {
    attributes: ['name']
  });
  const student = await Student.findByPk(req.params.student_id);

  res.render('edit', {
    user: teacher.get({ plain: true }),
    title: 'Teacher Assistant - Search',
    student: student.get({ plain: true}),
    user_page: true,
    search: true
  });
});


module.exports = router;
