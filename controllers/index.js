const router = require('express').Router();
const view_routes = require('./api/view-routes');
const teacher_routes =require('./api/teacher-routes')

const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', [
  view_routes,
  teacher_routes
]);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;