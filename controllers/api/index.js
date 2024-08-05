const router = require('express').Router();
const student_routes = require('./student_routes');


router.use('/students', student_routes);

module.exports = router;