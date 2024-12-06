const subscribeModal = document.getElementById('subscribe-modal');
const modalClose = subscribeModal.querySelector('.modal__close');
const keyCookie = 'notVisible';
const keyCookieRegExp = new RegExp(keyCookie+'=(\\w+);?');

window.addEventListener('load', () => {
  const result = document.cookie.match(keyCookieRegExp);
  if (result && result[1] === 'true') {
    subscribeModal.classList.remove('modal_active');
  } else {
    subscribeModal.classList.add('modal_active');
  }
});

modalClose.addEventListener('click', () => {
  let date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();
  document.cookie = "notVisible=true; path=/; expires=" + date;
  subscribeModal.classList.remove('modal_active');
});