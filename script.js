//Add Comments:
//1. Making priorities high,medium,low optional
//2. Unselecting the tasks like when I click on it and  I can't unselect(I think that is causing 
//when I type a task that starts with the letter do in the add task an alert comes up asking to 
//confirm to delete the task)




const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');



document.addEventListener('DOMContentLoaded', () => {
  addTaskButton.addEventListener('click', addTask);
  window.addEventListener('load', loadTasks);

  [taskInput, dueDateInput].forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') {
          alert('Please enter a task name.');
          return;
        }

        addTask();
        addTaskButton.disabled = false;
      }
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    const selected = document.querySelector('li.selected');
    if (!selected) return;

    const key = event.key.toLowerCase();

    if (key === 'c') {
      selected.classList.toggle('completed');
      saveTasks();
    }

    if (key === 'd') {
      const confirmDelete = confirm(
        `Delete this task: "${selected.textContent}"?`
      );
      if (confirmDelete) {
        taskList.removeChild(selected);
        saveTasks();
      }
    }
  });
});

function createDeleteButton(taskItem) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      taskList.removeChild(taskItem);
      saveTasks();
    }
  });
  return deleteBtn;
}

  
  


function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
   const taskPriority = getPriority();
  
  if (taskText === '') {
    alert('Please enter a task name.');
    return;
  }
  if (addTask === '') {
    ('Please enter a task name.');
    return;
  }

  let displayText = taskText;

  const taskItem = document.createElement('li');
  const priority = getPriority();
  
  if (priority) {
    taskItem.classList.add(priority.toLowerCase());
  }


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

  const deleteBtn = createDeleteButton(taskItem);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
  taskInput.value = '';
  dueDateInput.value = '';
  addTaskButton.disabled = true;
  saveTasks();

  taskItem.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    const wasSelected = taskItem.classList.contains('selected');
    document.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
    if (!wasSelected) {
      taskItem.classList.add('selected');
    }
  });
}

function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll('li');

  items.forEach((item) => {
    const spans = item.querySelectorAll('span');
    tasks.push({
      text: spans[0].textContent,
      dueDate: spans[1] ? spans[1].textContent.replace('Due: ', '') : '',
      completed: item.classList.contains('completed'),
      priority: item.classList.contains('high')
        ? 'High'
        : item.classList.contains('medium')
        ? 'Medium'
        : item.classList.contains('low')
        ? 'Low'
        : null,
        
    });
    
  });

  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('todoTasks');
  if (!saved) return;

  const tasks = JSON.parse(saved);

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
  

    if (task.priority) {
      taskItem.classList.add(task.priority.toLowerCase());
    }

    const span = document.createElement('span');
    span.textContent = task.text;
    taskItem.appendChild(span);

    const dateSpan = document.createElement('span');
    dateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';
    dateSpan.style.marginLeft = '10px';
    taskItem.appendChild(dateSpan);

    taskItem.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        return;
      }
      const wasSelected = taskItem.classList.contains('selected');
      document.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
      if (!wasSelected) {
        taskItem.classList.add('selected');
      }
    });

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'completed';
    completeBtn.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });
    taskItem.appendChild(completeBtn);

    const deleteBtn = createDeleteButton(taskItem);
    taskItem.appendChild(deleteBtn);

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
  });
}
