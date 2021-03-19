const form = document.querySelector(".input-box"),
    input=form.querySelector("input"),
    waitList=document.querySelector(".wait-list"),
    completeList=document.querySelector(".complete-list");

const TODO_LS='toDos';



function loadToDos(){
    const loadedToDos=localStorage.getItem(TODO_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        });
    }
}

function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}
const toDos=[];
function paintToDo(text){
    const plusLi = document.createElement('li');
    const delBtn = document.createElement('img');

    //const img=document.createElement("img");
    delBtn.src="img/bin.png";
    //delBtn.innerHTML="$";

    //delBtn.append(img);
    delBtn.addEventListener("click", deleteToDo);
    const newId=toDos.length+1;
    //plusLi.innerHTML = input.value;
    const inputText=document.createTextNode(input.value);
    plusLi.id=newId;

    const span = document.createElement("span");
    span.addEventListener("click", toggleToDo);
    //span.innerText=text;
    span.appendChild(inputText);
    plusLi.appendChild(span);
    plusLi.appendChild(delBtn);

    waitList.appendChild(plusLi);
    countTodos();

    const toDoObj = {
        text: text,
        id: newId
    };
    //saveToDos();
    toDos.push(toDoObj);
}

function toggleToDo(event){
    let span = event.target;
    let li = span.parentNode;
    //if(waitList.has)
    // waitList.removeChild(li);
    span.removeEventListener("click", toggleToDo);
    let completedLi = li.cloneNode(true);
    li.remove();
    // completeList.appendChild(li);
    completedLi.childNodes[0].addEventListener("click", toggleUp);
    completedLi.childNodes[1].addEventListener("click", deleteToDo);
    completeList.appendChild(completedLi);
    countTodos();
}

function toggleUp(event){
    let span=event.target;
    let li=span.parentNode;
    span.removeEventListener("click", toggleUp);
    let incompletedLi = li.cloneNode(true);
    incompletedLi.childNodes[0].addEventListener("click", toggleToDo);
    incompletedLi.childNodes[1].addEventListener("click", deleteToDo);
    waitList.appendChild(incompletedLi);
    li.remove();
    countTodos();
}

function deleteToDo(event){
    console.log("delete");
    let btn = event.target;
    let li = btn.parentNode;
    li.parentNode.removeChild(li);
    countTodos();
}

function countTodos() {
    let completedCount = document.querySelectorAll("ul.wait-list li").length;
    let incompletedCount = document.querySelectorAll("ul.complete-list li").length;
    document.getElementById("wait-count").innerHTML = "(" + completedCount.toString() + ")"
    document.getElementById("complete-count").innerHTML = "(" + incompletedCount.toString() + ")";
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintToDo(currentValue);
    input.value="";
}
function init(){
    loadToDos();
    countTodos();
    form.addEventListener("submit",handleSubmit);
}
init();