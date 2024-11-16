const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const dropdownValue = dropdown.querySelector('.dropdown__value');
  const dropdownList = dropdown.querySelector('.dropdown__list');
  const dropdownItems = dropdown.querySelectorAll('.dropdown__item');
  dropdownValue.addEventListener('click', () => {
    const coordinates = dropdownValue.getBoundingClientRect();
    dropdownList.style.top = coordinates.height + 'px';
    dropdownList.style.left = coordinates.x + 'px';
    dropdownList.classList.add('dropdown__list_active');
  });

  dropdownItems.forEach(dropdownItem => {
    const dropdownLink = dropdownItem.querySelector('.dropdown__link');
    dropdownLink.onclick = () => {
      return false;
    };
    dropdownItem.addEventListener('click', () => {
      dropdownValue.textContent = dropdownLink.textContent;
      dropdownList.classList.remove('dropdown__list_active');
    });
  });
});