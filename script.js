//yehey 하이
const todoForm = document.querySelector(".submitContainer"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todoListContainer");

const TODOS_LS = "todos"
const todos =[];    //여러개의 할 일들을 담을 리스트

function loadToDos(){
    const localTodo = localStorage.getItem(TODOS_LS);
    if(localTodo!==null){
        //로컬스토리지에서 데이터 가져오기 String -> Obj 변환 필요
        const local = JSON.parse(localTodo);
        local.forEach(function(toDo){
            addToDo(toDo.text);
        })
    }
}
function addToDo(text){
    const todo = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "🗑";
    const span = document.createElement("span");
    span.innerText = text;
    const todoId = todos.length+1;

    todo.appendChild(span);
    todo.appendChild(delBtn);
    todo.id=todoId;
    todo.classList.add("todoList");

    todoList.appendChild(todo);

    const todoObj = {
        text : text,
        id: todoId
    };

    todos.push(todoObj);
    saveToLocal();
}

function saveToLocal(){
    localStorage.setItem(TODOS_LS,JSON.stringify(todos))    //js 객체를 String으로 바꿔서 로컬 스토리지에 저장
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