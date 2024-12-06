const progress = document.getElementById('progress');
const form = document.getElementById('form');
const xhr = new XMLHttpRequest();
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  xhr.open('POST', form.action);
  xhr.send(formData);
});

xhr.addEventListener('load', () => {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 201) {  
      alert('Сервер ответил - Запрос выполнен успешно!');
    }
  }
});
xhr.upload.addEventListener('progress', (event) => {
  progress.max = event.total;
  progress.value = event.loaded;
});
xhr.upload.addEventListener('load', (event) => {
  alert('Данные полностью загружены на сервер!');
});
xhr.upload.addEventListener('error', (event) => {
  alert('Произошла ошибка при загрузке данных на сервер!');
});