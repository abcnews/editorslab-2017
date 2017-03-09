const express = require('express');
const sqlite3 = require('sqlite3');
const encrypt = require('../lib/encrypt');
const router = express.Router();

const db = new Promise((resolve, reject) => {
	let conn = new sqlite3.Database("data.sqlite");
	conn.serialize(() => {
		conn.run(`CREATE TABLE IF NOT EXISTS data
				(
					username TEXT,
					email TEXT,
					fingerprint TEXT
				)`, (err) => err ? reject(err) : resolve(conn));
	});
});

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

function saveUser(user) {
  return new Promise((resolve, reject) => {
    db.then(function(db) {
      db.run("INSERT INTO data (username, email, fingerprint) VALUES ($username, $email, $fingerprint)", user, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}
