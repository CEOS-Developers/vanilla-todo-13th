function deleteTodoEvent(event) {
    let targetEvent = event.target.parentNode;
    targetEvent.parentNode.removeChild(targetEvent);
    console.log('deleted')
}

function addTodoEvent(event) {
    let content = document.querySelector("#todo-input--input").value;


    // Do nothing if form is blank
    if (content == '') {
        event.preventDefault();
        return;
    }

    let newTodoContent =
        `<div class="todolist-waits--content">
            <div class="todolist-waits--content--text">${content}</div>
            <img src="img/bin.png" alt="" class="todolist-delete-button">
        </div>`;

    document.querySelector('#todolist-waits--contents-section').insertAdjacentHTML('beforeend', newTodoContent);
    document.querySelector('#todo-input').reset();

    let todoListCount = document.querySelectorAll(".todolist-waits--content").length;
    document.querySelector("#todolist-waits--count").innerHTML = todoListCount;
    document.querySelectorAll('.todolist-delete-button').forEach(function (element) {
        element.addEventListener('click', deleteTodoEvent);
    })

    // Prevent reloading when submit
    event.preventDefault();
}

document.querySelector('#todo-input').addEventListener('submit', addTodoEvent);
document.querySelectorAll('.todolist-delete-button').forEach(function (element) {
    element.addEventListener('click', deleteTodoEvent);
})