const router = require('express').Router();
const { Teacher, Student } = require('../models');

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
    title: 'My Movies - Register',
    errors: req.session.errors,
    register: true
  });

  delete req.session.errors;
});

// Favorites Page Route
router.get('/dashboard', redirectGuest, async (req, res) => {
  const teacher = await Teacher.findByPk(req.session.id, {
    attributes: ['name'],
    include: Student
  });

  res.render('dashboard', {
    user: teacher.get({ plain: true }),
    title: 'Teacher Assistant - Student',
    user_page: true,
    favorites: true
  });
});

// Search Page Route
router.get('/student_profile', redirectGuest, async (req, res) => {
  const teacher = await Teacher.findByPk(req.session.id, {
    attributes: ['name']
  });

  res.render('student_profile', {
    user: teacher.get({ plain: true }),
    title: 'Teacher Assistant - Search',
    user_page: true,
    search: true
  });
});

module.exports = router;