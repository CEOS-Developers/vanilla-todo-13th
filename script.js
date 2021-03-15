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

document.getElementById('new_item').addEventListener('keydown', handleTodoInputKeyEvent);

const addTodo = () => {
  const todoValue = document.getElementById("new_item").value;
  if (todoValue != null && todoValue != '') {
    document.getElementById("new_item").value = '';
    let todoSpan = document.createElement('span');
    todoSpan.appendChild(document.createTextNode(todoValue));
  
    const trashImg = document.createElement('img');
    trashImg.src = 'img/bin.png';
    trashImg.alt = 'complete';
    trashImg.className = 'trash hidden';
    
    let newItem = document.createElement('div');
    newItem.className = "item";
    d = new Date()
    newItem.id = d.getTime()
    newItem.addEventListener('mouseover', () => {handleTodoMouseOver(trashImg)});
    newItem.addEventListener('mouseout', () => {handleTodoMouseOut(trashImg)});
    todoSpan.addEventListener('click', () => {completeTodo(newItem)});
    newItem.appendChild(todoSpan);
    trashImg.addEventListener('click', () => {removeTodo(newItem)});
    newItem.appendChild(trashImg);

    document.getElementById('container-items-incomplete').appendChild(newItem);
    updateCount('add');
    
    newItemObj = {
      id: d.getTime().toString(),
      todoValue,
      completed: false
    }

    addLocalStorage(newItemObj);
  }
}

const completeTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item complete"
  completedItem.childNodes[0].addEventListener('click', () => {incompleteTodo(completedItem)});
  completedItem.childNodes[1].addEventListener('click', () => {removeTodo(completedItem)});
  document.getElementById('container-items-complete').appendChild(completedItem);
  updateLocalStorage(item.id, 'complete');
  item.remove();
  updateCount('complete');
}

const incompleteTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item"
  completedItem.childNodes[0].addEventListener('click', () => {completeTodo(completedItem)});
  completedItem.childNodes[1].addEventListener('click', () => {removeTodo(completedItem)});
  document.getElementById('container-items-incomplete').appendChild(completedItem);
  updateLocalStorage(item.id, 'incomplete');
  item.remove();
  updateCount('incomplete');
}

const removeTodo = (item) => {
  updateLocalStorage(item.id, 'remove');
  item.remove();
  if (item.className == "item") {
    updateCount('delete_incomplete');
  } else {
    updateCount('delete_complete');
  }
}

const updateCount = (actionType) => {
  let incompleteCount = parseInt(document.getElementById('incomplete_count').innerText.substring(1,2));
  let completeCount = parseInt(document.getElementById('complete_count').innerText.substring(1,2));

  switch(actionType) {
    case 'incomplete':
      completeCount -= 1;
    case 'add':
      incompleteCount += 1;
      break;
    case 'complete':
      incompleteCount -= 1;
      completeCount += 1;
      break;
    case 'delete_incomplete':
      incompleteCount -= 1;
      break;
    case 'delete_complete':
      completeCount -= 1;
      break;
  }

  document.getElementById('incomplete_count').innerHTML = '(' + incompleteCount.toString() + ')';
  document.getElementById('complete_count').innerHTML = '(' + completeCount.toString() + ')';
}

const addLocalStorage = (newItemObj) => {
  ls = localStorage.getItem('todos');
  ls = JSON.parse(ls);
  if (ls === null) {
    ls = [newItemObj];
  } else {
    ls.push(newItemObj);
  }
  localStorage.setItem('todos', JSON.stringify(ls));
}

const updateLocalStorage = (itemId, actionType) => {
  ls = JSON.parse(localStorage.getItem('todos'));
  if(actionType === 'remove') {
    ls = ls.filter(item => item.id !== itemId);
  } else if(actionType === 'complete' || actionType === 'incomplete') {
    for(let i=0; i<ls.length; i++) {
      if(ls[i].id === itemId) {
        ls[i].completed = actionType === 'complete';
        break;
      }
    }
  } else {
    console.log(`Error - Invalid actionType: ${actionType}`);
  }
  localStorage.setItem('todos', JSON.stringify(ls));
}

const loadLocalStorage = () => {
  ls = JSON.parse(localStorage.getItem('todos'));
  let completeCount = 0;
  let incompleteCount = 0;

  ls.forEach(item => {
    let newItem = document.createElement('div');
    
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
      document.getElementById('container-items-complete').appendChild(newItem);
      completeCount++;
    } else {
      newItem.className = "item";
      todoSpan.addEventListener('click', () => { completeTodo(newItem) });
      document.getElementById('container-items-incomplete').appendChild(newItem);
      incompleteCount++;
    }
  });

  document.getElementById('incomplete_count').innerHTML = '(' + incompleteCount.toString() + ')';
  document.getElementById('complete_count').innerHTML = '(' + completeCount.toString() + ')';
}

loadLocalStorage();