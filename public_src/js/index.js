const encrypt = require('../../lib/encrypt');

encrypt.init(window.kbpgp);

const errEl = document.querySelector('[name="err"]');
const bareMessageEl = document.querySelector('[name="bare-message"]');
const bareNameEl = document.querySelector('[name="bare-name"]');
const messageEl = document.querySelector('[name="message"]');
const publicKeyEl = document.querySelector('[name="public-key"]');

function encryptMessage() {
  const bareMessage = bareMessageEl.value;
  const bareName = bareNameEl.value;

  if (!bareMessage) {
    messageEl.value = '';

    return;
  }

  const toEncrypt = `Name: ${bareName ? bareName : 'Anonymous'}
Message:
${bareMessage}`;

  encrypt(publicKeyEl.value, toEncrypt)
  .then(value => {
    messageEl.value = value;
  });
}

if (errEl) {
  console.error(errEl.value);
}

if (bareMessageEl && bareNameEl && publicKeyEl && publicKeyEl.value && messageEl) {
  bareNameEl.oninput = encryptMessage;
  bareNameEl.onkeyup = encryptMessage;
  bareNameEl.onpaste = encryptMessage;
  bareMessageEl.oninput = encryptMessage;
  bareMessageEl.onkeyup = encryptMessage;
  bareMessageEl.onpaste = encryptMessage;
  encryptMessage();
}
