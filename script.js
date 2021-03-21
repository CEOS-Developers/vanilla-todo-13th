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
// 대기중 완료됨 그리기
const paintH3 = () => {
    const pending = document.querySelector(".pending");
    const complete = document.querySelector(".complete");
    let toDoNumber = 0;
    let completeNumber = 0;
    toDos.forEach((v) => {
        v.com === false ? toDoNumber++ : completeNumber++;
    })
    pending.innerText = `대기중 (${toDoNumber})`;
    complete.innerText = `완료됨 (${completeNumber})`;
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
    paintH3();
    saveLocalStorage();
}
// list의 click handler(toggle)
const toggleHandler = (e) => {
    if (e.target.nodeName === 'IMG'){
        return;
    }
    const li = e.target.nodeName === 'LI' ? e.target : e.target.parentNode;
    const index = toDos.findIndex((v) => v.id === parseInt(li.id));
    if (toDos[index].com === false) {
        toDos[index].com = true;
        comList.appendChild(li);
    } else if (toDos[index].com === true) {
        toDos[index].com = false;
        toDoList.appendChild(li);
    }
    paintH3();
    saveLocalStorage();
}
// list추가
const appendList = (text, com) => {
    const li = document.createElement("li");
    li.className = 'li';
    const span = document.createElement("span");
    span.className = 'text';
    const delButton = document.createElement("button");
    delButton.className = 'delBtn';
    delButton.innerHTML = "<img src='./img/bin.png' width='18'>";
    li.addEventListener("click", toggleHandler);
    delButton.addEventListener("click", delHandler);
    const newId = toDos.length + 1;
    li.id = newId;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delButton);
    com ? comList.appendChild(li) : toDoList.appendChild(li);
    // 새로 생성된 list에 해당하는 객체 생성
    const toDoObj = {
        text,
        id: newId,
        com,
    }
    toDos.push(toDoObj);
    saveLocalStorage();
}
//submit하면 작동되는 handler
const submitHandler = (event) => {
    event.preventDefault();
    const value = toDoInput.value;
    appendList(value, false);
    toDoInput.value = "";
    paintH3();
}
// localstorage에서 data가져오기
const loadLocalStorage = () => {
    const loadToDos = localStorage.getItem("toDos");
    if (loadToDos !== null) {
        const parseToDos = JSON.parse(loadToDos);
        parseToDos.forEach((v) => {
            appendList(v.text, v.com);
        })
    }
    paintH3();
}
const init = () =>{
    loadLocalStorage();
    toDoForm.addEventListener("submit", submitHandler);
}



init();
