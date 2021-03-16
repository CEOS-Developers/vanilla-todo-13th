const toDoList = document.querySelector(".toDoList");
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");


const appendList = (value) => {
    const li = document.createElement("li");
    const delButton = document.createElement("button");
    delButton.innerHTML = "<img src='./img/bin.png' width='18'>";
    const text = document.createElement("span");
    text.innerText = value;
    li.appendChild(text);
    li.appendChild(delButton);
    toDoList.appendChild(li);
}
const submitHandler = (event) => {
    event.preventDefault();
    const value = toDoInput.value;
    appendList(value);
    toDoInput.value = "";
}
const init = () =>{
    toDoForm.addEventListener("submit", submitHandler);
}

init();