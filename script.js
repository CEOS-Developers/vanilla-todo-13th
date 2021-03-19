const toDoForm = document.querySelector(".jsForm"),
    toDoInput = document.querySelector("input"),
    toDoInputBtn = toDoForm.querySelector("button"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];  //상단 박스에 들어갈 todo
const done = []; //완료된 리스트 

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} //새로고침 후에도 기존 내용 유지하기 위함

function deleteToDo(event){
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    const index = parseInt(li.id);
    toDoList.removeChild(li);
    toDos.splice(index,1);
    saveToDos();
   /* toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();*/
}

function doneToDos(text){

}//완료된 리스트 구현할 부분

let idNumbers= 1;

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers+=1;
    //삭제버튼 생성
    delBtn.innerHTML = "<img src='/img/bin.png' width = '20px' height = '20px'>";
    delBtn.style.opacity = "0.0"; 
    span.style.display = "inline-block";
    span.style.width = '280px';
    span.innerText= text;
    span.addEventListener("click", doneToDos);
    delBtn.addEventListener("click", deleteToDo);
    li.addEventListener("mouseover", function(){delBtn.style.opacity = "1.0";});
    li.addEventListener("mouseout", function(){delBtn.style.opacity = "0.0";});
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //배열에 추가
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