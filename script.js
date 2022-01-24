let inputField = document.getElementById("inputField");
let ul = document.getElementById("toDoListParent");

var toDos = JSON.parse(localStorage.getItem("Content")) || [];

function createId() {
  return Math.random().toString(36).substring(2, 9);
}

function date() {
  let div = document.getElementById("dateContainer");
  let span = document.getElementById("date");
  var today = new Date();

  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  span.innerHTML = date;
  div.appendChild(span);
}

function renderData() {
  ul.innerHTML = "";
  let taskContent;
  let ind;

  if (toDos.length === 0) {
    let h2 = document.createElement("h2");
    h2.innerHTML = "You're up-to-date";
    ul.appendChild(h2);
  } else {
    for (let i = 0; i < toDos.length; i++) {
      taskContent = toDos[i].Content;
      ind = [i];

      let li = document.createElement("li");
      li.setAttribute("id", `${ind}`);
      li.setAttribute("class", "todoElement");
      li.innerHTML = taskContent;

      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", "checkbox");
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          li.style.textDecoration = "line-through";
          toDos[ind].Checkbox = true;
          saveToStorage();
          console.log(ind);
          console.log(toDos);
        } else {
          li.style.textDecoration = "none";
          toDos[ind].Checkbox = false;
          saveToStorage();
          console.log(toDos);
        }
      });
      let deleteButton = document.createElement("a");
      deleteButton.setAttribute("onclick", `deletToDo(${ind})`);
      deleteButton.setAttribute("id", `deleteButton`);
      deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

      let editButton = document.createElement("a");
      editButton.setAttribute("onclick", `editToDo(${ind})`);
      editButton.setAttribute("id", `editButton`);
      editButton.innerHTML = `<i class="fas fa-edit"></i>`;

      let span = document.createElement("span");
      span.setAttribute("id", "spanContainer");

      let spanFor = document.createElement("span");
      spanFor.setAttribute("id", "spanMainEl");

      let spanForButton = document.createElement("span");
      spanForButton.setAttribute("id", "spanForButton");

      spanFor.appendChild(checkbox);
      spanFor.appendChild(li);

      spanForButton.appendChild(editButton);
      spanForButton.appendChild(deleteButton);
      span.appendChild(spanFor);
      span.appendChild(spanForButton);
      ul.appendChild(span);
    }
  }
}

function addNewToDo() {
  let inputValue = inputField.value;

  let dataFormat = {
    Content: inputValue,
    id: createId(),
    Checkbox: false,
  };

  if (inputValue !== "") {
    toDos.push(dataFormat);
    inputField.value = "";

    renderData();
    saveToStorage();
  } else {
    alert("Input must be filled");
  }
}

function deletToDo(ind) {
  toDos.splice(ind, 1);
  inputField.value = "";

  // show the right button when editing ToDo and then deleting it!
  let mainButton = document.getElementById("addNewToDo");
  mainButton.style.display = "inline-block";

  let saveButton = document.getElementById("saveNewTask");
  saveButton.style.display = "none";
  renderData();
  saveToStorage();
}

function editToDo(ind) {
  let toDoText = toDos[ind].Content; // toDoText = fazer compras;
  inputField.value = toDoText;

  let mainButton = document.getElementById("addNewToDo");
  mainButton.style.display = "none";

  let saveButton = document.getElementById("saveNewTask");
  saveButton.style.display = "inline-block";

  saveButton.setAttribute("onclick", `replaceToDo(${ind})`);
}

function replaceToDo(ind) {
  // console.log(ind);
  let todoText = toDos[ind].Content;
  todoText = inputField.value;
  if (ind !== -1) {
    toDos[ind].Content = todoText;

    renderData();
    saveToStorage();

    let mainButton = document.getElementById("addNewToDo");
    mainButton.style.display = "inline-block";

    let saveButton = document.getElementById("saveNewTask");
    saveButton.style.display = "none";

    inputField.value = "";
  }
}

function clearAll() {
  toDos.length = 0;
  saveToStorage();
  renderData();

  inputField.value = "";

  // show the right button when editing ToDo and then deleting it!
  let mainButton = document.getElementById("addNewToDo");
  mainButton.style.display = "inline-block";

  let saveButton = document.getElementById("saveNewTask");
  saveButton.style.display = "none";
}

function saveToStorage() {
  localStorage.setItem("Content", JSON.stringify(toDos));
}
console.log(toDos);
renderData();

//window.localStorage.clear();
