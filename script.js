//yehey 하이
const todoForm = document.querySelector(".submitContainer"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todoListContainer");

const TODOS_LS = "todos"

function loadToDos(){
    const todos = localStorage.getItem(TODOS_LS);
    if(todos!==null){
        //로컬스토리지에서 데이터 가져오기
    }
}
function addToDo(text){
    const todo = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "🗑";
    const span = document.createElement("span");
    span.innerText = text;

    todo.appendChild(span);
    todo.appendChild(delBtn);

    todoList.appendChild(todo);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    if (currentValue!==''){
        console.log(currentValue);
        addToDo(currentValue);
    }
    todoInput.value="";
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}


//실행..?
init();