const express = require('express');
const MailgunJS = require('mailgun-js');
const db = require('../lib/db');
const encrypt = require('../lib/encrypt');

const MAILGUN_API_KEY = 'key-579a45dd4383484789a7172bf22dcf9b';
const MAILGUN_DOMAIN = 'sandboxab94e321b77645f8b315a2a5789ec9a9.mailgun.org';

const mailgun = MailgunJS({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

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
      user,
      layout: 'submit'
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
  .then(user => new Promise((resolve, reject) => {
    mailgun.messages().send({
      from: `Initiate <notifications@${MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: 'New secure message',
      text: req.body.message
    }, (err, body) => {
      if (err) {
        reject(err);
      }

      console.log(body);

      resolve(user);
    })
  }))
  .then(user => {
    res.render('submit-done', {
      title: 'Submit ▸ Thanks',
      message: req.body.message,
      user,
      layout: 'submit'
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
