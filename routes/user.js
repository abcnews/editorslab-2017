var express = require('express');

function createRouter(app) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('respond with a resource');
  });

  return router;
}

module.exports = createRouter;
