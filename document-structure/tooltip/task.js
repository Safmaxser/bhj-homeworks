const hasTooltips = document.querySelectorAll('.has-tooltip');
const tooltip = document.querySelector('.tooltip');
let saveElement;

hasTooltips.forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    if (tooltip.classList.contains('tooltip_active') && (saveElement === element)) {
      tooltip.classList.remove('tooltip_active');
    } else {
      saveElement = element;
      tooltip.innerText = element.getAttribute('title');
      tooltip.classList.add('tooltip_active');
      let indentTop = element.offsetTop;
      let indentLeft = element.offsetLeft;
      const indentMiddle = (element.offsetHeight - tooltip.offsetHeight) / 2

      if (tooltip.dataset.position === 'top') {
        indentTop -= tooltip.offsetHeight + 3;
      } else if (tooltip.dataset.position === 'bottom') {
        indentTop += element.offsetHeight + 3;
      } else if (tooltip.dataset.position === 'left') {
        indentLeft -= tooltip.offsetWidth + 3;
        indentTop += indentMiddle;
      } else if (tooltip.dataset.position === 'right') {
        indentLeft += element.offsetWidth + 3;
        indentTop += indentMiddle;
      }
      tooltip.style.top = `${indentTop}px`;
      tooltip.style.left = `${indentLeft}px`;        
    }
  });
});