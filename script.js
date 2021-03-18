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
    delBtn.addEventListener("click",deleteToDo);
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

    const toDoObj = {
        text: text,
        id: newId
    };
    //saveToDos();
    //toDos.push(toDoObj);
}

function toggleToDo(event){
    console.log("toggle");
    const btn = event.target;
    const li = btn.parentNode;
    //if(waitList.has)
    completeList.append(li);
    //waitList.removeChild(li);
}

function deleteToDo(event){
    console.log("delete");
    const btn = event.target;
    const li = btn.parentNode;
    waitList.removeChild(li);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    paintToDo(currentValue);
    input.value="";
}

function init(){
    loadToDos();
    form.addEventListener("submit",handleSubmit);
}

init();