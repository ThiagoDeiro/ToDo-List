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
date();

function renderData() {
    ul.innerHTML = "";
    let taskContent;
    let ind;

    if (toDos.length === 0) {
        let h2 = document.createElement("h2");
        h2.innerHTML = "You're up-to-date";
        ul.appendChild(h2);
    } else {
        // ToDo.lenght= 10
        for (let i = 0; i < toDos.length; i++) {
            taskContent = toDos[i].Content;
            ind = [i];

            let li = document.createElement("li");
            li.setAttribute("id", "todoElement");
            li.innerHTML = taskContent;

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "checkbox");
            checkbox.addEventListener("change", function() {
                if (this.checked) {
                    li.style.textDecoration = "line-through";
                } else {
                    li.style.textDecoration = "none";
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

            /*let clearButton = document.createElement("a");
            clearButton.setAttribute("onclick", `clearAll(${ind})`);
            clearButton.setAttribute("id", `clearButton`);
            clearButton.innerHTML = "Clear All";*/

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
    };

    if (inputValue !== "") {
        toDos.push(dataFormat);
        inputField.value = "";

        renderData();
        saveToStorage();
    } else {
        alert("Input must be filled");
    }
    console.log(localStorage);
}

function deletToDo(ind) {
    toDos.splice(ind, 1);
    renderData();
    saveToStorage();
}

function editToDo(ind) {
    // * todos[2].id
    let toDoText = toDos[ind].Content; // toDoText = fazer compras;
    inputField.value = toDoText; //Input field => toDotext

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
    if (toDos.length === 0) {
        console.log(localStorage);
    }

}


function saveToStorage() {
    localStorage.setItem("Content", JSON.stringify(toDos));
}
console.log(toDos);
renderData();

//window.localStorage.clear();