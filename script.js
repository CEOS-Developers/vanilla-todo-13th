const toDoForm = document.querySelector(".jsForm"),
    toDoInput = document.querySelector("input"),
    toDoInputBtn = toDoForm.querySelector("button"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} //새로고침 후에도 기존 내용 유지하기 위함

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    
    delBtn.innerHTML = "<img src='/img/bin.png' width = '20px' height = '20px'>";
    delBtn.style.opacity = "0.0"; 
    span.style.display = "inline-block";
    span.style.width = '280px';
    span.innerText= text;
    
    li.addEventListener("mouseover", function(){delBtn.style.opacity = "1.0";});
    li.addEventListener("mouseout", function(){delBtn.style.opacity = "0.0";});
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoInputBtn.addEventListener("click", handleSubmit);
}

init();