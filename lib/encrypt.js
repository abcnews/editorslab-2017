const pify = require('pify');

const ENCRYPT_TEST = 'TEST';

let importFromArmoredPGP;
let box;

function encrypt(publicKey, message) {
  return new Promise((resolve, reject) => {
    if (!importFromArmoredPGP || !box) {
      reject(new Error('encrypt has not been intitalised'));
    }

    importFromArmoredPGP({armored: publicKey})
    .then(keyManager => box({encrypt_for: keyManager, msg: message}))
    .then(resolve)
    .catch(reject);
  });
}

function init(kbpgp) {
  if (importFromArmoredPGP && box) {
    return;
  }

  importFromArmoredPGP = pify(kbpgp.KeyManager.import_from_armored_pgp);
  box = pify(kbpgp.box);
}

function check(publicKey) {
  return new Promise((resolve, reject) => {
    if (typeof publicKey !== typeof '' || !publicKey.length) {
      reject(new Error('No public key provided'));
    }

    encrypt(publicKey, ENCRYPT_TEST)
    .then(resolve)
    .catch(reject);
  });
}

module.exports = encrypt;
module.exports.init = init;
module.exports.check = check;
