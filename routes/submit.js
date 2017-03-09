const express = require('express');
const encrypt = require('../lib/encrypt');

const router = express.Router();

router.get('/', (req, res, next) => {
  const publicKey = req.query['public-key'];

  encrypt.check(publicKey)
  .then(() => {
    res.render('submit', {
      title: 'Submit',
      publicKey
    });
  })
  .catch(next);
});

router.post('/', (req, res) => {
  res.render('submit-done', {
    title: 'Submit ▸ Thanks',
    message: req.body.message
  });
});

module.exports = router;
