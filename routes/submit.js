var express = require('express');
var router = express.Router();

/* GET home  */

router.get('/', function(req, res) {
  res.render('submit', { title: 'Submit your message' });
});

router.post('/', function(req, res) {



  res.render('thanks', { title: 'Thanks', message: req.body.message });
});

module.exports = router;
