const toTimeString = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);
const timer = document.getElementById('timer');
let timerValue = Number(timer.textContent);
const setIntervalId = setInterval(() => {
  if (timerValue === 0) {
    clearInterval(setIntervalId);
    location.assign('https://autostrada.su/price/autostrada1.xlsx');
    alert('Вы победили в конкурсе!');
  } else {
    timerValue -= 1;    
    timer.textContent = toTimeString(timerValue);  
  }      
},1000);