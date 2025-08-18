
 const taskInput = document.getElementById('taskInput');
 const addTaskButton = document.getElementById('addTaskBtn');
 const taskList = document.getElementById('taskList');

 function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; 

  const taskItem = document.createElement('li');

  
  const span = document.createElement('span');
  span.textContent = taskText;
  taskItem.appendChild(span);


  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'completed';
  completeBtn.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    saveTasks();
  });
  taskItem.appendChild(completeBtn);


  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });
  taskItem.appendChild(deleteBtn);

 
  taskList.appendChild(taskItem);
  taskInput.value = "";
  saveTasks();
}


function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll('li');

  items.forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });

  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}


function loadTasks() {
  const saved = localStorage.getItem('todoTasks');
  if (!saved) return;

  const tasks = JSON.parse(saved);

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.text;
    taskItem.appendChild(span);


    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'completed';
    completeBtn.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });
    taskItem.appendChild(completeBtn);

   
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });
    taskItem.appendChild(deleteBtn);

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
  });
}


addTaskButton.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);

