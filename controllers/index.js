const router = require('express').Router();
const student_routes = require('./api/student-routes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', 
  student_routes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;