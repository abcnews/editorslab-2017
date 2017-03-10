const express = require('express');
const db = require('../lib/db');
const encrypt = require('../lib/encrypt');

const router = express.Router();

router.get('/', (req, res, next) => {
  const id = req.query['user'];

  if (!id) {
    return res.render('submit', {
      title: 'Submit',
      err: new Error(`No user id.`)
    });
  }

  loadUser(id)
  .then(user => {
    res.render('submit', {
      title: 'Submit',
      user
    });
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  const id = req.body['user'] || req.query['user'];

  if (!id) {
    return res.render('submit', {
      title: 'Submit',
      err: new Error(`No user id.`)
    });
  }

  loadUser(id)
  .then(user => {
    res.render('submit-done', {
      title: 'Submit ▸ Thanks',
      message: req.body.message,
      user
    });
  })
  .catch(next);
});

module.exports = router;

function loadUser(id) {
  return new Promise((resolve, reject) => {
    db.then(conn => {
      conn.all("SELECT * FROM data WHERE id = $id", {$id: id}, function (err, rows) {
        if (err) {
					return reject(err);
				}

        if (rows.length === 0) {
					return reject(new Error(`User with id "${id}" not found.`));
				}

        const user = Object.keys(rows[0]).reduce((memo, key) => {
					memo[key.replace('$', '')] = rows[0][key];

					return memo;
				}, {});

				resolve(user);
      });
    }).catch(reject);
  });
}
