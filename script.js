const handleTodoInputKeyEvent = (e) => {
  if (e.code === "Enter") {
    addTodo();
  }
}

document.getElementById('new_item').addEventListener('keydown', handleTodoInputKeyEvent);

const addTodo = () => {
  const todoValue = document.getElementById("new_item").value;
  if (todoValue != null && todoValue != '') {
    document.getElementById("new_item").value = '';
    let todoSpan = document.createElement('span');
    todoSpan.appendChild(document.createTextNode(todoValue));
  
    let newItemText = document.createElement('span');
    newItemText.appendChild(document.createTextNode(todoValue));
  
    const trashImg = document.createElement('img');
    trashImg.src = 'img/bin.png';
    trashImg.alt = 'complete';
    trashImg.className = 'trash';
    
    let newItem = document.createElement('div');
    newItem.className = "item";
    newItem.addEventListener('mouseover', handleTodoMouseOver(trashImg));
    newItem.addEventListener('mouseout', handleTodoMouseOut(trashImg));
    todoSpan.addEventListener('click', () => {completeTodo(newItem)});
    newItem.appendChild(todoSpan);
    trashImg.addEventListener('click', () => {removeTodo(newItem)});
    newItem.appendChild(trashImg);
    
    document.getElementById('container-items-incomplete').appendChild(newItem);
    updateCount('add');
  }
}

const completeTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item complete"
  completedItem.childNodes[0].addEventListener('click', () => {incompleteTodo(completedItem)});
  completedItem.childNodes[1].addEventListener('click', () => {removeTodo(completedItem)});
  document.getElementById('container-items-complete').appendChild(completedItem);
  item.remove();
  updateCount('complete');
}

const incompleteTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item"
  completedItem.childNodes[0].addEventListener('click', () => {completeTodo(completedItem)});
  completedItem.childNodes[1].addEventListener('click', () => {removeTodo(completedItem)});
  document.getElementById('container-items-incomplete').appendChild(completedItem);
  item.remove();
  updateCount('incomplete');
}

const removeTodo = (item) => {
  item.remove();
  if (item.className == "item") {
    updateCount('delete_incomplete');
  } else {
    updateCount('delete_complete');
  }
}

const updateCount = (actionType) => {
  let incompleteCount = parseInt(document.getElementById('incomplete_count').innerText.substring(1,2));
  console.log(document.getElementById('incomplete_count').innerText.substring(1,2));
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