function startRotator(rotator) {
  const rotatorList = rotator.children;
  let counter = 0;
  return function startRotator() {  
    let interval = Number(rotatorList[counter].dataset.speed);
    setTimeout(() => {
      rotatorList[counter].classList.remove('rotator__case_active');
      counter = rotatorList[counter+1] === undefined ? 0 : counter += 1;
      rotatorList[counter].classList.add('rotator__case_active');
      rotatorList[counter].style.color = rotatorList[counter].dataset.color;
      startRotator();
    }, interval);
  }();
}

const rotator = document.querySelector('.rotator');
startRotator(rotator);