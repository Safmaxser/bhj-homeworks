const dead = document.getElementById('dead');
const lost = document.getElementById('lost');
let deadCounter = 0;
let lostCounter = 0;

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

for (let index = 1; index < 10; index++) {
  const hole = getHole(index);
  hole.onclick = () => {
    if (hole.classList.contains('hole_has-mole')) {
      deadCounter += 1;
    } else {
      lostCounter += 1; 
    }

    dead.textContent = deadCounter;
    lost.textContent = lostCounter;
    if (deadCounter >= 10) {      
      alert('Победа!');
    }
    if (lostCounter >= 5) {
      alert('Вы проиграли!');
    }
    
    if (deadCounter >= 10 || lostCounter >= 5) {
      deadCounter = 0;
      lostCounter = 0;
      dead.textContent = deadCounter;
      lost.textContent = lostCounter;
    }
  };    
}