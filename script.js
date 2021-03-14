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
    newItem.addEventListener('click', () => {completeTodo(newItem)});
    newItem.appendChild(todoSpan);
    newItem.appendChild(trashImg);
    
    document.getElementById('container-items-incomplete').appendChild(newItem);
  }
}

const completeTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item complete"
  completedItem.addEventListener('click', () => {incompleteTodo(completedItem)});
  document.getElementById('container-items-complete').appendChild(completedItem);
  item.remove();
  updateCount('complete');
}

const incompleteTodo = (item) => {
  let completedItem = item.cloneNode(true);
  completedItem.className = "item"
  completedItem.addEventListener('click', () => {completeTodo(completedItem)});
  document.getElementById('container-items-incomplete').appendChild(completedItem);
  item.remove();
  updateCount('incomplete');
}