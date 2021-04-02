const button = document.querySelector(".reload");
const list = document.getElementById("list");
const dateElement = document.querySelector(".date");
const todayElement = document.querySelector(".todayContainer");
const content = document.querySelector(".content");
const input = document.getElementById("input");
const newToday = document.querySelector(".today");
const plusButton = newToday.querySelector("i");
const trash = document.querySelector("ul");
const container = document.querySelector(".container");
let LIST, id;
let data = localStorage.getItem("TODO");

const uncheck = "fa-circle";
const check = "fa-check-circle";
const line_through = "lineThrough";

let ile = 0;

//ładowanie zaległych zadań, czyszczenie pamięci
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

button.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//wyświetlanie daty
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function AddInput() {
  if (ile == 0) {
    const text = `
                    <div class="textInput">
                        <input type="text", id="input", placeholder="Enter the activity">
                    </div>
                    `;
    const position = "beforeend";
    container.insertAdjacentHTML(position, text);
  }
}

function addMinusButton() {
  const item = `
                     <i class="fas fa-minus-circle"></i>
                `;
  newToday.insertAdjacentHTML("beforeend", item);
}

plusButton.addEventListener("click", function (element) {
  AddInput();
  document.getElementById("input").focus();
  ile++;
});

function deleteInput() {
  /* debugger; */
  const text = document.querySelector(".textInput");
  container.removeChild(text);
  ile = 0;
}

document.addEventListener("click", function (event) {
  const elementClicked = event.target;
  /* debugger; */
  if (elementClicked.id != "input" && elementClicked != plusButton)
    deleteInput();
});

function addTodo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? check : uncheck;
  const LINE = done ? line_through : " ";
  const item = `
                    <li class="item" id = "${id}">
                        <i class="fas ${DONE}" job = "complete" ></i>
                        <p contenteditable = "true" class = "text ${LINE}">${toDo}</p>
                        <i class="far fa-trash-alt" job = "delete"></i>
                    </li>
                `;

  const position = "afterbegin";
  list.insertAdjacentHTML(position, item);
}
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13 && event.srcElement.id == "input") {
    const toDo = event.srcElement.value;

    if (toDo) {
      addTodo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    event.srcElement.value = "";
  }

});

function deleteTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.parentNode.id].trash = true;

  localStorage.setItem("TODO", JSON.stringify(LIST));
}

function completeTodo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);

  element.parentNode.querySelector(".text").classList.toggle(line_through);

  LIST[element.parentNode.id].done = LIST[element.parentNode.id].done
    ? false
    : true;

  localStorage.setItem("TODO", JSON.stringify(LIST));
}

list.addEventListener("click", function (event) {
  const elementClicked = event.target;
  const jobValue = elementClicked.attributes.job.value;
  if (jobValue == "delete") {
    setTimeout(function () {
      deleteTodo(elementClicked);
    }, 150);
  } else if (jobValue == "complete") {
    completeTodo(elementClicked);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

document.addEventListener("click", function () {
  const elementClicked = event.target;
  addEditedTodo(elementClicked);
});


