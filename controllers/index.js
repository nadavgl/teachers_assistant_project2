const router = require('express').Router();
// const view_routes = require('./view-routes');
const api_routes = require('./api')

const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api',api_routes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;