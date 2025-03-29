document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    if (task === "") return;

    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleComplete(this)">${task}</span> <button class="delete-btn" onclick="removeTask(this)">X</button>`;
    document.getElementById("taskList").appendChild(li);
    saveTasks();
    input.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span> <button class="delete-btn" onclick="removeTask(this)">X</button>`;
        document.getElementById("taskList").appendChild(li);
    });
}