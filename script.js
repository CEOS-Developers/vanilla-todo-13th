const form = document.querySelector(".input-box"),
    input=form.querySelector("input"),
    waitList=document.querySelector(".wait-list");

const TODO_LS='toDos';

function loadToDos(){
    const toDos=localStorage.getItem(TODO_LS);
    if(toDos!==null){

    }
}

function paintToDo(text){
    const plusLi = document.createElement('li');
    plusLi.innerHTML = input.value;
    waitList.append(plusLi);   
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