const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const circle = document.getElementById("circle");

const taskCount = document.getElementById("taskCount");

const themeBtn = document.getElementById("themeBtn");

const quote = document.getElementById("quote");
const quoteBtn = document.getElementById("quoteBtn");


// DATE

const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


// TASKS

let tasks = [];


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
}


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span>${task.text}</span>

            <button class="delete">×</button>
        `;


        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {

            tasks[index].completed = checkbox.checked;

            renderTasks();

        });


        const deleteBtn = li.querySelector(".delete");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            renderTasks();

        });


        taskList.appendChild(li);

    });

    updateProgress();
}


function updateProgress() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;


    taskCount.textContent =
        `${total} ${total === 1 ? "task" : "tasks"}`;


    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }


    progress.style.width = `${percentage}%`;

    progressText.textContent = `${percentage}%`;


    circle.style.background =
        `conic-gradient(
            var(--accent) ${percentage * 3.6}deg,
            var(--border) ${percentage * 3.6}deg
        )`;

    circle.querySelector("span").textContent =
        `${percentage}%`;
}


addBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTask();
    }

});


// DARK MODE

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


// MOTIVATIONAL QUOTES

const quotes = [
    "The secret of getting ahead is getting started.",
    "Small progress is still progress.",
    "Focus on the next step, not the whole staircase.",
    "Your future is created by what you do today.",
    "Discipline turns goals into reality.",
    "One productive day can change your entire week."
];


quoteBtn.addEventListener("click", () => {

    const randomIndex =
        Math.floor(Math.random() * quotes.length);

    quote.textContent = quotes[randomIndex];

});