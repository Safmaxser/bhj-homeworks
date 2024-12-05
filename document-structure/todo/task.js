const tasksForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');
const keyStorage = 'taskList';
const dataList = [];

tasksForm.addEventListener('submit', event => {
  event.preventDefault();
  const nameTask = taskInput.value.trim();
  if (nameTask) {
    try {
      const idTask = Date.now();
      addTask(idTask, nameTask);
      localStorage.setItem(keyStorage, JSON.stringify(dataList));
      tasksForm.reset();  
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Превышен лимит!');
      }
    }
  }
});

function addTask(idTask ,nameTask) {
  dataList.push({
    id: idTask,
    name: nameTask,
  }); 
  tasksList.insertAdjacentHTML('beforeEnd', `
    <div class="task">
      <div class="task__title">
        ${nameTask}
      </div>
      <a href="#" class="task__remove">&times;</a>
    </div>
  `);
  const task = tasksList.lastElementChild;
  const btnRemove = task.querySelector('.task__remove');
  btnRemove.addEventListener('click', event => {
    event.preventDefault();
    const idList = Array.from(dataList, el => el.id);
    const findItem = idList.indexOf(idTask);
    dataList.splice(findItem, 1);
    localStorage.setItem(keyStorage, JSON.stringify(dataList));
    task.remove();
  });
};


window.addEventListener('load', () => {
  dataList.length = 0;
  const taskStorage = JSON.parse(localStorage.getItem(keyStorage));
  if (taskStorage?.length) {    
    taskStorage.forEach(taskItem => {
      addTask(taskItem.id, taskItem.name);
    });
  }
});