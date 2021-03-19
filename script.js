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
    
    const span = document.createElement("span");

    
    const img=document.createElement("img");
    delBtn.src="img/bin.png";
    
    delBtn.addEventListener("click",deleteToDo);
    const newId=toDos.length+1;
    plusLi.innerText = input.value;
    const inputText=document.createTextNode(input.value);
    plusLi.id="plusLi";
   
    //plusLi.addEventListener("click", toggleToDo);
    
    span.appendChild(inputText);
    span.appendChild(delBtn);
    plusLi.addEventListener("click", toggleToDo);
    //plusLi.appendChild(delBtn);
    plusLi.appendChild(span);
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
    const span = document.createElement("span");
    const delBtn=document.createElement('img');
    delBtn.src="img/bin.png";
    const inputText=document.createTextNode(li.innerText);
    
    while(li.hasChildNodes()){
        li.removeChild(li.firstChild);
    }
   
    delBtn.addEventListener("click",deleteComplete);
    span.addEventListener("click", toggleUp);
    
    span.appendChild(inputText);
    li.appendChild(span);
    li.after(delBtn);
    
    completeList.appendChild(li);

    
}

function deleteToDo(event){
    console.log("delete");
    const btn = event.target;
    const li = btn.parentNode;
    waitList.removeChild(li);
    completeList.removeChild(li);
}

function toggleUp(event){
    const btn=event.target;
    const li=btn.parentNode;
    const span = document.createElement("span");
    const delBtn=document.createElement('img');
    delBtn.src="img/bin.png";
    /*
    li.removeEventListener("click",toggleUp);
    li.addEventListener("click", function(){
        completeList.remove(li);
        waitList.append(li);
        li.addEventListener("click", toggleToDo);
    });
    */
    
    while(li.hasChildNodes()){
        li.removeChild(li.firstChild);
    }
    delBtn.addEventListener("click",deleteToDo);
    span.addEventListener("click", toggleToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    waitList.append(li);

}

function deleteComplete(event){
    const btn = event.target;
    const li = btn.parentNode;
    completeList.removeChild(li);
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