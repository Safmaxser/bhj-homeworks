const tasksForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

tasksForm.addEventListener('submit', event => {
  event.preventDefault();
  const idTask = `task_${Date.now()}`;
  const nameTask = taskInput.value.trim();
  try {
    localStorage.setItem(idTask, nameTask);
    addTask(idTask, nameTask);
    tasksForm.reset();  
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('Превышен лимит!');
    }
  }
});

function addTask(idTask, nameTask) {
  const task = document.createElement('div');
  task.classList.add('task');
  const taskTitle = document.createElement('dvi');
  taskTitle.classList.add('task__title');
  taskTitle.innerText = nameTask;
  const btnRemove = document.createElement('a');
  btnRemove.href = '#';
  btnRemove.classList.add('task__remove');
  btnRemove.innerText = '×';  
  task.appendChild(taskTitle);
  task.appendChild(btnRemove);
  tasksList.appendChild(task);
  btnRemove.addEventListener('click', event => {
    event.preventDefault();
    localStorage.removeItem(idTask);
    task.remove();
  });
};

window.addEventListener('load', () => {
  const storageKeys = Object.keys(localStorage).sort();
  storageKeys.forEach(itemKey => {
    if (itemKey.slice(0, 5) === 'task_') {
      addTask(itemKey, localStorage.getItem(itemKey));
    };
  });
});