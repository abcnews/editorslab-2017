const {KeyManager, box} = window.kbpgp;
const pify = require('pify');

const importFromArmoredPGP = pify(KeyManager.import_from_armored_pgp);
const _box = pify(box);

module.exports = function encrypt(publicKey, message) {
  return new Promise((resolve, reject) => {
    importFromArmoredPGP({armored: publicKey})
    .then(keyManager => _box({encrypt_for: keyManager, msg: message}))
    .then(resolve)
    .catch(reject);
  });
};
