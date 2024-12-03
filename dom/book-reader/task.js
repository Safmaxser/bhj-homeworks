const controlFontSize = document.querySelectorAll('.book__control_font-size a');
const controlColor = document.querySelectorAll('.book__control_color a');
const controlBackground = document.querySelectorAll('.book__control_background a');
const bookContent = document.querySelector('.book__content');

for (const elementForAssignment of controlFontSize) {
  elementForAssignment.addEventListener('click', (event) => {
    event.preventDefault();
    bookContent.classList.remove('book_fs-small');  
    bookContent.classList.remove('book_fs-big');      
    for (const elementToRemove of controlFontSize) {
      elementToRemove.classList.remove('font-size_active');      
    }
    if (elementForAssignment.classList.contains('font-size_small')) {
      bookContent.classList.add('book_fs-small');   
    } else if (elementForAssignment.classList.contains('font-size_big')) {
      bookContent.classList.add('book_fs-big');      
    }
    elementForAssignment.classList.add('font-size_active'); 
  });
}

for (const elementForAssignment of controlColor) {
  elementForAssignment.addEventListener('click', (event) => {
    event.preventDefault();
    bookContent.classList.remove('book_color-black');
    bookContent.classList.remove('book_color-gray');  
    bookContent.classList.remove('book_color-whitesmoke');      
    for (const elementToRemove of controlColor) {
      elementToRemove.classList.remove('color_active');      
    }
    if (elementForAssignment.classList.contains('text_color_black')) {
      bookContent.classList.add('book_color-black');   
    } else if (elementForAssignment.classList.contains('text_color_gray')) {
      bookContent.classList.add('book_color-gray');      
    } else if (elementForAssignment.classList.contains('text_color_whitesmoke')) {
      bookContent.classList.add('book_color-whitesmoke');      
    }
    elementForAssignment.classList.add('color_active'); 
  });
}

for (const elementForAssignment of controlBackground) {
  elementForAssignment.addEventListener('click', (event) => {
    event.preventDefault();
    bookContent.classList.remove('book_bg-black');
    bookContent.classList.remove('book_bg-gray');  
    bookContent.classList.remove('book_bg-whitesmoke');      
    for (const elementToRemove of controlBackground) {
      elementToRemove.classList.remove('color_active');      
    }
    if (elementForAssignment.classList.contains('bg_color_black')) {
      bookContent.classList.add('book_bg-black');   
    } else if (elementForAssignment.classList.contains('bg_color_gray')) {
      bookContent.classList.add('book_bg-gray');      
    } else if (elementForAssignment.classList.contains('bg_color_whitesmoke')) {
      bookContent.classList.add('book_bg-whitesmoke');      
    }
    elementForAssignment.classList.add('color_active'); 
  });
}