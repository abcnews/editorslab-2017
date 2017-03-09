const express = require('express');
const encrypt = require('../lib/encrypt');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('create', {
    title: 'Create'
  });
});

router.post('/', (req, res) => {
  const publicKey = req.body['public-key'];

  encrypt.check(publicKey)
  .then(() => {
    const submitURL = `/submit?public-key=${encodeURIComponent(publicKey)}`;

    res.render('create-done', {
      title: 'Create ▸ Thanks',
      publicKey,
      submitURL
    });
  })
  .catch(err => {
    res.render('create', {
      title: 'Create',
      err
    });
  });
});

module.exports = router;
