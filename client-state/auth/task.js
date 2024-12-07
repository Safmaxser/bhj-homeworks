const signin = document.getElementById('signin');
const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const titleInvalid = document.createElement('h3');
titleInvalid.innerText = 'Неверный логин/пароль';
titleInvalid.style.cssText = 'color: red; display: none';
signin.appendChild(titleInvalid);
const btnDeauthorization = document.createElement('button');
btnDeauthorization.type = 'button';
btnDeauthorization.innerText = 'Выйти';
welcome.appendChild(btnDeauthorization);
const keyStorage = 'authorizedUser';

function authorization(authorizedUser) {
  signin.classList.remove('signin_active');
  welcome.classList.add('welcome_active');
  userId.innerText = authorizedUser;
}
btnDeauthorization.addEventListener('click', () => {
  localStorage.removeItem(keyStorage);
  welcome.classList.remove('welcome_active');
  signin.classList.add('signin_active');  
  userId.innerText = '';
});
window.addEventListener('load', () => {
  const authorizedUser = localStorage.getItem(keyStorage);
  if (authorizedUser) {    
    authorization(authorizedUser);
  }
});

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  titleInvalid.style.cssText += 'display: none';
  let response = await fetch(signinForm.action, {
    method: 'POST',
    body: new FormData(signinForm)
  });
  if (response.ok) {
    const result = await response.json();
    if (result instanceof Object) { 
      if (result.success) {
        localStorage.setItem(keyStorage, result.user_id);
        authorization(result.user_id);
      } else {
        titleInvalid.style.cssText += 'display: block';
      }
    }
  } else {
    titleInvalid.style.cssText += 'display: block';
  }
  signinForm.reset();
});