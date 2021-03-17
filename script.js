//yehey 하이
const todoForm = document.querySelector(".submitContainer"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todoListContainer");

const TODOS_LS = "todos"
let todos =[];    //여러개의 할 일들을 담을 배열

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
    //delBtn.innerText = "";
    delBtn.classList.add("deleteimg");
    const completeBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    const todoId = todos.length+1;

    delBtn.addEventListener("click", deleteTodo);
    

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

function deleteTodo(event){
    const deleteNode =  event.target.parentNode; //버튼의 부모노드를 반환해줌, 여기서 id를 찾을 수 있음!
    todoList.removeChild(deleteNode);
    const cleanTodo = todos.filter(function(toDo){
        return toDo.id !== parseInt(deleteNode.id);       //deleteNode.id 의 값은 string, 따라서 형변환 필요
    });   //filter는 배열의 모든 아이템을 통해 함수를 실행, 함수 값이 true 인 아이템들로만 새로운 배열을 생성

    todos=cleanTodo;
    saveToLocal();          //실수 했던 부분, 로컬스토리지에 저장하려면 이걸 꼭 썼어야 함,,
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