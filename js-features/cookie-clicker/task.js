const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');
const clickerSpeed = document.getElementById('clicker__speed');
let clickTime = performance.now();

cookie.onclick = () => {
  let clickTimeCurrent = performance.now();
  const speed = 1000 / (clickTimeCurrent - clickTime);
  clickerSpeed.textContent = (Math.round(speed * 100) / 100).toFixed(2);
  clickTime = clickTimeCurrent;  
  clickerCounter.textContent = Number(clickerCounter.textContent) + 1;
  
  if (cookie.width === 200) {
    cookie.width += 50;
  } else {
    cookie.width = 200;
  }    
}