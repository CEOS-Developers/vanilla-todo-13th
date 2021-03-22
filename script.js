// Event handlers
const handleTodoInputKeyEvent = (e) => {
  if (e.code === "Enter") {
    addTodo();
  }
}

const handleTodoMouseOver = (trashImg) => {
  trashImg.className = "trash show"
}

const handleTodoMouseOut = (trashImg) => {
  trashImg.className = "trash hide"
}

// Todo Items CRUD

const createTodoElement = (item) => {
  let newItem = document.createElement('div');
  newItem.id = item.id;
    
  let todoSpan = document.createElement('span');
  todoSpan.appendChild(document.createTextNode(item.todoValue));
  newItem.appendChild(todoSpan);

  const trashImg = document.createElement('img');
  trashImg.src = 'img/bin.png';
  trashImg.alt = 'complete';
  trashImg.className = 'trash hidden';
  trashImg.addEventListener('click', () => {removeTodo(newItem)});
  newItem.appendChild(trashImg);

  newItem.addEventListener('mouseover', () => {handleTodoMouseOver(trashImg)});
  newItem.addEventListener('mouseout', () => {handleTodoMouseOut(trashImg)});

  if (item.completed) {
    newItem.className = "item complete";
    todoSpan.addEventListener('click', () => { incompleteTodo(newItem) });
  } else {
    newItem.className = "item";
    todoSpan.addEventListener('click', () => { completeTodo(newItem) });
  }

  return newItem;
}

const addTodo = () => {
  const todoValue = document.getElementById("new_item").value;
  if (todoValue != null && todoValue != '') {
    document.getElementById("new_item").value = '';
    let d = new Date();
    const newItemObj = {
      id: d.getTime().toString(),
      todoValue,
      completed: false,
    };
    const newItem = createTodoElement(newItemObj);
    document.getElementById('container-items-incomplete').appendChild(newItem);
    addLocalStorage(newItemObj);
    updateCount('add');
  }
}

const completeTodo = (item) => {
  let newItem = createTodoElement({
    id: item.id,
    todoValue: item.childNodes[0].innerText,
    completed: true
  })
  document.getElementById('container-items-complete').appendChild(newItem);
  updateLocalStorage(item.id, 'complete');
  item.remove();
  updateCount('complete');
}

const incompleteTodo = (item) => {
  let newItem = createTodoElement({
    id: item.id,
    todoValue: item.childNodes[0].innerText,
    completed: false
  });
  document.getElementById('container-items-incomplete').appendChild(newItem);
  updateLocalStorage(item.id, 'incomplete');
  item.remove();
  updateCount('incomplete');
}

const removeTodo = (item) => {
  updateLocalStorage(item.id, 'remove');
  item.remove();
  if (item.className == "item") {
    updateCount('remove_incomplete');
  } else {
    updateCount('remove_complete');
  }
}

// Count number of items

const updateCount = (actionType) => {
  const incompleteSpan = document.getElementById('incomplete_count');
  const completeSpan = document.getElementById('complete_count');

  let incompleteCount = parseInt(incompleteSpan.getAttribute('data-todo-incomplete-count'));
  let completeCount = parseInt(completeSpan.getAttribute('data-todo-complete-count'));

  switch(actionType) {
    case 'incomplete':
      completeCount -= 1;
    case 'add':
      incompleteCount += 1;
      break;
    case 'complete':
      completeCount += 1;
    case 'remove_incomplete':
      incompleteCount -= 1;
      break;
    case 'remove_complete':
      completeCount -= 1;
      break;
  }

  incompleteSpan.setAttribute('data-todo-incomplete-count', incompleteCount);
  incompleteSpan.innerHTML = '(' + incompleteCount.toString() + ')';
  completeSpan.setAttribute('data-todo-complete-count', completeCount);
  completeSpan.innerHTML = '(' + completeCount.toString() + ')';
}


// LocalStorage Handlers

const addLocalStorage = (newItemObj) => {
  let ls = localStorage.getItem('todos');
  ls = JSON.parse(ls);
  if (ls === null) {
    ls = [newItemObj];
  } else {
    ls.push(newItemObj);
  }
  localStorage.setItem('todos', JSON.stringify(ls));
}

const updateLocalStorage = (itemId, actionType) => {
  let ls = JSON.parse(localStorage.getItem('todos'));
  let selectedItem = null;
  ls = ls.filter((item) => {
    if(item.id === itemId) {
      selectedItem = item;
      return false;
    } else {
      return true;
    }
  });
  
  if(actionType === 'complete' || actionType === 'incomplete') {
    selectedItem.completed = actionType === 'complete'
    ls.push(selectedItem);
  }
  localStorage.setItem('todos', JSON.stringify(ls));
}

const loadLocalStorage = () => {
  let ls = JSON.parse(localStorage.getItem('todos'));
  
  let completeCount = 0;
  let incompleteCount = 0;

  if(ls !== null) {
    ls.forEach(item => {
      let newItem = createTodoElement(item);
  
      if (item.completed) {
        document.getElementById('container-items-complete').appendChild(newItem);
        completeCount++;
      } else {
        document.getElementById('container-items-incomplete').appendChild(newItem);
        incompleteCount++;
      }
    });
  }

  document.getElementById('incomplete_count').setAttribute('data-todo-incomplete-count', incompleteCount);
  document.getElementById('incomplete_count').innerHTML = '(' + incompleteCount.toString() + ')';
  document.getElementById('complete_count').setAttribute('data-todo-complete-count', completeCount);
  document.getElementById('complete_count').innerHTML = '(' + completeCount.toString() + ')';
}

// Run as soon as page loads
const initializeApp = () => {
  loadLocalStorage();
  document.getElementById('new_item').addEventListener('keypress', handleTodoInputKeyEvent);
}

window.onload = initializeApp;
