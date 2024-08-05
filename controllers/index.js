const router = require('express').Router();
const api_routes = require('./api')

const view_routes = require('./view_routes');
const teacher_routes = require('./teacher_routes');


router.use('/', [view_routes, teacher_routes]);
router.use('/api',api_routes);

router.use('*',(req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;