const revealList = document.querySelectorAll('.reveal');

function isVisible(el) {
  const {top, bottom} = el.getBoundingClientRect()
  if ((bottom < 0) || (top > window.innerHeight)) {
    return false;
  }
  return true;
}

document.addEventListener('scroll', () => {
  for (const reveal of revealList) {
    if (isVisible(reveal)) {
      reveal.classList.add('reveal_active');
    } else {
      reveal.classList.remove('reveal_active');
    }
  }
});