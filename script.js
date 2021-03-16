const toDoList = document.querySelector(".toDoList");
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const comList = document.querySelector(".completeList");

// 전체 list 관리위한 배열할당
let toDos = [];
// localstorage에 올림
const saveLocalStorage = () => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}
// delButton의 click handler
const delHandler = (event) => {
    const btn = event.target.parentNode;
    const li = btn.parentNode;
    if (li.parentNode.className === "toDoList") {
        toDoList.removeChild(li);
    } else {
        comList.removeChild(li);
    }
    const deletedList = toDos.filter((v) => {
        return parseInt(li.id) !== v.id;
    });
    toDos = deletedList;
    saveLocalStorage();
}
// list의 click handler
const toggleHandler = (e) => {
    if (e.target && e.target.nodeName === "LI"){
            const li = e.target;
        const index = toDos.findIndex((v) => v.id === parseInt(li.id));
        if (toDos[index].com === false) {
            toDos[index].com = true;
            comList.appendChild(li);
        } else if (toDos[index].com === true) {
            toDos[index].com = false;
            toDoList.appendChild(li);
        }
    }
}
// list추가
const appendList = (value) => {
    const li = document.createElement("li");
    const delButton = document.createElement("button");
    delButton.innerHTML = "<img src='./img/bin.png' width='18'>";
    li.addEventListener("click", toggleHandler);
    delButton.addEventListener("click", delHandler);
    const newId = toDos.length + 1;
    li.id = newId;
    li.innerText = value;
    li.appendChild(delButton);
    console.log("appendList에 li : ", li);
    toDoList.appendChild(li);
    // 새로 생성된 list에 해당하는 객체 생성
    const toDoObj = {
        text: value,
        id: newId,
        com: false,
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