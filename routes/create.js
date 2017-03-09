const express = require('express');

const encrypt = require('../lib/encrypt');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('create', {
    title: 'Create',
  });
});

router.post('/', function(req, res) {
  const publicKey = req.body['public-key'];

  console.log(req.body);

  encrypt.check(publicKey)
  .then(() => {
    res.render('create-done', {
      title: 'Create ▸ Thanks',
      publicKey: encodeURIComponent(publicKey)
    });
  })
  .catch(err => {
    res.render('create', {
      title: 'Create',
      err: err
    });
  });
});

module.exports = router;
