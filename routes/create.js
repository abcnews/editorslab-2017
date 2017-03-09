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
