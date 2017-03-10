const express = require('express');
const pify = require('pify');
const request = require('request');
const db = require('../lib/db');
const encrypt = require('../lib/encrypt');

const pRequest = pify(request, {multiArgs: true});

const router = express.Router();

router.get('/', (req, res) => {
  res.render('create', {});
});

router.post('/', (req, res) => {
  const username = req.body['username'];
  const email = req.body['email'];

  if (!username || !email) {
    return res.render('create', {
      err: new Error(`You're missing some information.`),
			username,
			email
    });
  }

  const lookupURL = `https://keybase.io/_/api/1.0/user/lookup.json?usernames=${username}&fields=pictures,profile,public_keys`;

  pRequest(lookupURL)
  .then(result => new Promise((resolve, reject) => {
		const [status, body] = result;
		const lookup = JSON.parse(body);

    if (lookup.them[0] === null) {
      reject(new Error(`No user found for username: ${username}`))
    }

    resolve(lookup.them[0]);
  }))
  .then(user => {
    return saveUser({
      username,
			email,
      publicKey: user.public_keys.primary.bundle,
      name: user.profile.full_name,
			bio: user.profile.bio,
      avatar: user.pictures.primary.url
    });
  })
	.then(user => {
		const submitURL = `/submit?user=${user.id}`;

    res.render('create-done', {
      user,
      submitURL
    });
	})
  .catch(err => {
    res.render('create', {
      err
    });
  });
});

module.exports = router;

function saveUser(user) {
	const row = Object.keys(user).reduce((memo, key) => {
		memo['$' + key] = user[key];

		return memo;
	}, {});

  return new Promise((resolve, reject) => {
    db.then(conn => {
      conn.run("INSERT INTO data (username, email, publicKey, name, bio, avatar) VALUES ($username, $email, $publicKey, $name, $bio, $avatar)", row, function (err) {
        if (err) {
					return reject(err);
				}

				user.id = this.lastID;
				resolve(user);
      });
    }).catch(reject);
  });
}
