const toDoList = document.querySelector(".toDoList");
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");

//localstorage에 올릴 배열할당
let toDos = [];

const saveLocalStorage = () => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}
const delHnadler = (event) => {
    const btn = event.target.parentNode;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const deletedList = toDos.filter((v) => {
        console.log(parseInt(li.id) !== v.id)
        return parseInt(li.id) !== v.id;
    });
    console.log(deletedList);
    toDos = deletedList;
    saveLocalStorage();
}
// list추가
const appendList = (value) => {
    const li = document.createElement("li");
    const delButton = document.createElement("button");
    const text = document.createElement("span");
    delButton.innerHTML = "<img src='./img/bin.png' width='18'>";
    delButton.addEventListener("click", delHnadler);
    const newId = toDos.length + 1;
    li.id = newId;
    text.innerText = value;
    li.appendChild(text);
    li.appendChild(delButton);
    toDoList.appendChild(li);
    // localstorage에 올릴 새 list에 해당하는 객체 생성
    const toDoObj = {
        text: value,
        id: newId,
    }
    toDos.push(toDoObj);
    saveLocalStorage();
}
//submit하면 작동되는 handler
const submitHandler = (event) => {
    event.preventDefault();
    const value = toDoInput.value;
    appendList(value);
    toDoInput.value = "";
}
// localstorage에서 data가져오기
const loadLocalStorage = () => {
    const loadToDos = localStorage.getItem("toDos");
    if (loadToDos !== null) {
        const parseToDos = JSON.parse(loadToDos);
        parseToDos.forEach((v, i) => {
            appendList(v.text);
        })
    }
}
const init = () =>{
    loadLocalStorage();
    toDoForm.addEventListener("submit", submitHandler);
}

init();