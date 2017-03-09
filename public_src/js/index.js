const encrypt = require('../../lib/encrypt');

encrypt.init(window.kbpgp);

const errEl = document.querySelector('[name="err"]');
const bareMessageEl = document.querySelector('[name="bare-message"]');
const messageEl = document.querySelector('[name="message"]');
const publicKeyEl = document.querySelector('[name="public-key"]');

function encryptBareMessage(e) {
  const bareMessage = bareMessageEl.value;

  if (!bareMessage) {
    messageEl.value = '';

    return;
  }

  encrypt(publicKeyEl.value, bareMessage)
  .then(value => {
    messageEl.value = value;
  });
}

if (errEl) {
  console.error(errEl.value);
}

if (bareMessageEl && publicKeyEl && publicKeyEl.value && messageEl) {
  bareMessageEl.oninput = encryptBareMessage; // ?
  bareMessageEl.onkeyup = encryptBareMessage; // ?
  bareMessageEl.onpaste = encryptBareMessage; // ?
}
