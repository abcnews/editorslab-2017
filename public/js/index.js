!function e(n,r,t){function u(i,c){if(!r[i]){if(!n[i]){var f="function"==typeof require&&require;if(!c&&f)return f(i,!0);if(o)return o(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var l=r[i]={exports:{}};n[i][0].call(l.exports,function(e){var r=n[i][1][e];return u(r?r:e)},l,l.exports,e,n,r,t)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<t.length;i++)u(t[i]);return u}({1:[function(e,n,r){"use strict";var t=function(e,n,r){return function(){for(var t=this,u=new Array(arguments.length),o=0;o<arguments.length;o++)u[o]=arguments[o];return new n(function(n,o){u.push(function(e,t){if(e)o(e);else if(r.multiArgs){for(var u=new Array(arguments.length-1),i=1;i<arguments.length;i++)u[i-1]=arguments[i];n(u)}else n(t)}),e.apply(t,u)})}},u=n.exports=function(e,n,r){"function"!=typeof n&&(r=n,n=Promise),r=r||{},r.exclude=r.exclude||[/.+Sync$/];var u=function(e){var n=function(n){return"string"==typeof n?e===n:n.test(e)};return r.include?r.include.some(n):!r.exclude.some(n)},o="function"==typeof e?function(){return r.excludeMain?e.apply(this,arguments):t(e,n,r).apply(this,arguments)}:{};return Object.keys(e).reduce(function(o,i){var c=e[i];return o[i]="function"==typeof c&&u(i)?t(c,n,r):c,o},o)};u.all=u},{}],2:[function(e,n,r){"use strict";function t(e){var n=o.value;if(!n)return void(i.value="");u(c.value,n).then(function(e){i.value=e})}var u=e("./utils/encrypt"),o=document.querySelector('[name="bare-message"]'),i=document.querySelector('[name="message"]'),c=document.querySelector('[name="public-key"]');o&&c&&c.value&&i&&(o.oninput=t)},{"./utils/encrypt":3}],3:[function(e,n,r){"use strict";var t=window.kbpgp,u=t.KeyManager,o=t.box,i=e("pify"),c=i(u.import_from_armored_pgp),f=i(o);n.exports=function(e,n){return new Promise(function(r,t){c({armored:e}).then(function(e){return f({encrypt_for:e,msg:n})}).then(r).catch(t)})}},{pify:1}]},{},[2]);