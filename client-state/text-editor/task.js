const editor = document.getElementById('editor');
const card = document.querySelector('.card');
const keyStorage = 'textEditor';

window.addEventListener('load', () => {
  editor.value = localStorage.getItem(keyStorage);
});
editor.addEventListener('input', () => {
  localStorage.setItem(keyStorage, editor.value);
});

const btnRemove = document.createElement('button');
btnRemove.type = 'button';
btnRemove.innerText = 'Очистить'
card.appendChild(btnRemove);
btnRemove.addEventListener('click', () => {
  editor.value = '';
  localStorage.removeItem(keyStorage);
});