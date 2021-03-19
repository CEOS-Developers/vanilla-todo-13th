function addToDo() {
    const toDoValue = document.getElementById("new-to-do").value;
    if (toDoValue != '') {
        let newItem = document.createElement('div');
        newItem.className = 'todo';
        
        let toDoSpan = document.createElement('span');
        let toDoValueSpan = document.createTextNode(toDoValue);
        toDoSpan.appendChild(toDoValueSpan);
        newItem.appendChild(toDoSpan);
        
        let trashImg = document.createElement('img');
        trashImg.src = "img/bin.png";
        trashImg.className = "trashcan";
        newItem.appendChild(trashImg);
        
        document.getElementById("content-incomplete").appendChild(newItem);
        document.getElementById("new-to-do").value = '';
    }
}

function handleKeyDown(e) {
    // console.log(e.code);
    if (e.code == "Enter") {
        addToDo();
    }
}

function initializeApp() {
    document.getElementById('new-to-do').addEventListener('keydown', handleKeyDown);

}

window.onload = initializeApp;

