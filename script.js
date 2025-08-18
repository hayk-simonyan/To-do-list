
 const taskInput = document.getElementById('taskInput');
 const dueDateInput = document.getElementById('dueDateInput');
 const addTaskButton = document.getElementById('addTaskBtn');
 const taskList = document.getElementById('taskList');

 function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;


  if (taskText === "") {
    alert("Please enter a task name.");
    return;

  }

 let displayText = taskText;



   

  const taskItem = document.createElement('li');

  
  const span = document.createElement('span');
  span.textContent = displayText;

  taskItem.appendChild(span);



  const dateSpan = document.createElement('span');
  dateSpan.textContent = dueDate ? `Due: ${dueDate}` : '';
  dateSpan.style.marginLeft = '10px';
  taskItem.appendChild(dateSpan);




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
  dueDateInput.value = "";
  saveTasks();

taskItem.addEventListener('click', () => {
  document.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
  taskItem.classList.add('selected');
});




}


function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll('li');

items.forEach(item => {
  const spans = item.querySelectorAll('span'); 
  tasks.push({
    text: spans[0].textContent, 
    dueDate: spans[1] ? spans[1].textContent.replace('Due: ', '') : '', 
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

    const dateSpan = document.createElement('span');
    dateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';
    dateSpan.style.marginLeft = '10px';
    taskItem.appendChild(dateSpan);


    taskItem.addEventListener('click', () => {
  document.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
  taskItem.classList.add('selected');
});





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

[taskInput, dueDateInput].forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});

document.addEventListener('keydown', (event) => {
  const selected = document.querySelector('li.selected');
  if (!selected) return;

  if (event.key.toLowerCase() === 'c') {
    selected.classList.toggle('completed');
    saveTasks();
  }

  if (event.key.toLowerCase() === 'd') {
    taskList.removeChild(selected);
    saveTasks();
  }
});

