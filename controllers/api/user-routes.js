const router = require('express').Router();
const { Teacher } = require('../../models');


//
router.get('/', async (req, res) => {
    try {
      const userData = await Teacher.findAll();
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const userData = await Teacher.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  



  module.exports = router;