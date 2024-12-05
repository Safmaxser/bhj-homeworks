const loader = document.getElementById('loader');
const items = document.getElementById('items');
const keyStorage = 'valuteList';
const dataStorageObj = {};
const urlExchangeRate = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
let xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.timeout = 10000;

xhr.addEventListener('load', () => {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      loader.classList.remove('loader_active');
      const valuteObj = xhr.response.response.Valute;
      const valuteListKey = Object.keys(valuteObj).sort();
      valuteListKey.forEach(valuteKey => {
        creatingPosition(valuteObj[valuteKey].CharCode, valuteObj[valuteKey].Value);        
      });  
      localStorage.setItem(keyStorage, JSON.stringify(dataStorageObj));
    } else {
      xhr.open('GET', urlExchangeRate);
      xhr.send();
    }
  }
});

xhr.addEventListener('error', () => {
  xhr.open('GET', urlExchangeRate);
  xhr.send();
});
xhr.addEventListener('timeout', () => {
  xhr.open('GET', urlExchangeRate);
  xhr.send();
});

function creatingPosition(charCode, value) {
  dataStorageObj[charCode] = value;
  items.insertAdjacentHTML('beforeEnd', `
    <div class="item">
      <div class="item__code">
        ${charCode}
      </div>
      <div class="item__value">
        ${value}
      </div>
      <div class="item__currency">
        руб.
      </div>
    </div>
    `);
};

window.addEventListener('load', () => {
  xhr.open('GET', urlExchangeRate);
  xhr.send();
  const dataStorage = JSON.parse(localStorage.getItem(keyStorage));
  if (dataStorage instanceof Object) { 
    loader.classList.remove('loader_active');
    const valuteListKey = Object.keys(dataStorage).sort();
    valuteListKey.forEach(valuteKey => {
      creatingPosition(valuteKey, dataStorage[valuteKey]);
    });  
  }
});

