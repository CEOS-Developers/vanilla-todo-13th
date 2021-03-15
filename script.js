// load element
const waitLabel = document.getElementById('wait_label');
const doneLabel = document.getElementById('done_label');
const waitList = document.getElementById('wait_list_container');
const doneList = document.getElementById('done_list_container');
const addButton = document.getElementById('btn_add');
const input = document.getElementById('input_todo');

const list = [];

refreshList();

addButton.onclick = function () {
  list.push({
    text: input.value,
    isDone: false,
  });

  refreshList();
  input.value = '';
  return false;
};

function refreshList() {
  doneList.innerHTML = '';
  waitList.innerHTML = '';
  let waitCount = 0;
  let doneCount = 0;

  list.forEach((element, index) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    const img = document.createElement('img');

    li.appendChild(p);
    li.appendChild(btn);
    btn.appendChild(img);

    li.onclick = function () {
      setDone(index, !element.isDone);
    };

    p.innerText = element.text;
    img.src = 'img/bin.png';

    if (element.isDone) {
      doneList.appendChild(li);
      doneCount++;
    } else {
      waitList.appendChild(li);
      waitCount++;
    }
  });

  waitLabel.innerHTML = '대기중 (' + waitCount + ')';
  doneLabel.innerHTML = '완료됨 (' + doneCount + ')';
}

function setDone(id, value) {
  list[id].isDone = value;
  console.log(list[id]);
  refreshList();
}
