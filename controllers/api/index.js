const router = require('express').Router();
const teacher_routes = require('./teacher-routes');


router.use('/teachers', teacher_routes);

module.exports = router;