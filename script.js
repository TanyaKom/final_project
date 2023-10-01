const inputTxt = document.getElementById("input-txt");
const button = document.getElementById("hero-btn");
const placeholder = document.getElementById("hero-btn");
const listName = document.getElementById("listName");

window.addEventListener("load", () => {
const savedListName = localStorage.getItem("listName");
if (savedListName) {
    listName.textContent = savedListName;
    }
});

button.addEventListener("click", () => {
    let textInInput = inputTxt.value.trim();
    if(textInInput !== "") {
        listName.textContent = textInInput;
        inputTxt.value = "";
        localStorage.setItem("listName",textInInput);
    }
});

const taskInput = document.getElementById("hero-container-text");
const addTaskButton = document.getElementById("add-btn");
const taskList = document.getElementById("tasksList");
const emptyList = document.getElementById("emptylist");

let tasks = [];

function displayTasks() {
    taskList.innerHTML = "";

tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const taskTextElement = document.createElement("div");
        taskTextElement.classList.add("task-text");

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;
checkbox.addEventListener("change", () => {
    tasks[index].completed = checkbox.checked;

if (tasks.length === 0) {
    emptyList.style.display = "block";
    clearButton.style.display = "none";
} else {
    emptyList.style.display = "none";
    clearButton.style.display = "block";
    }
    displayTasks();
});

taskTextElement.appendChild(checkbox);
taskTextElement.appendChild(document.createTextNode(task.text));

if(task.completed) {
    taskTextElement.style.textDecoration = "line-through";
    }

const deleteIcon = document.createElement("img");
deleteIcon.classList.add("delete-icon");
deleteIcon.src = "/images/img-cross.jpeg";

const deleteButton = document.createElement("button");
deleteButton.classList.add("task-button");
deleteButton.appendChild(deleteIcon);

deleteButton.addEventListener("click", () => {
    tasks.splice(index, 1);

    displayTasks();
});

taskItem.appendChild(taskTextElement);
taskItem.appendChild(deleteButton);
taskList.appendChild(taskItem);
});

if (tasks.length === 0) {
    emptyList.style.display = "block";
} else {
    emptyList.style.display = "none";
    }
}

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({text: taskText, completed: false});
        taskInput.value = "";
        displayTasks();

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
const savedTasks = localStorage.getItem("tasks");
if(savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
}

const clearButton = document.getElementById("clear-btn");

clearButton.addEventListener("click", () => {
    tasks = [];
    localStorage.removeItem("tasks");

    listName.textContent = "";
    localStorage.removeItem("listName");
    displayTasks();
});