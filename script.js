// document.addEventListener("DOMContentLoaded", () => {
//     const taskTable = document.querySelector("#taskTable tbody");
//     const addTaskBtn = document.getElementById("addTask");
//     const resetAllBtn = document.getElementById("resetAll");

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     function renderTasks() {
//         taskTable.innerHTML = "";
//         tasks.forEach((task, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${task.name}</td>
//                 <td>
//                     <button class="status-btn" data-index="${index}" style="background-color: ${task.status}; padding: 12px; border-radius:12px; border: 2px solid #ddd;"></button>
//                 </td>
//                 <td>
//                     <button class="reset-btn" data-index="${index}">Reset</button>
//                     <button class="delete-btn" data-index="${index}">Eliminar</button>
//                 </td>
//             `;
//             taskTable.appendChild(row);
//         });
//     }

//     function saveTasks() {
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//     }

//     addTaskBtn.addEventListener("click", () => {
//         const taskName = prompt("Ingrese el nombre del cliente:");
//         if (taskName) {
//             tasks.push({ name: taskName, status: "red" });
//             saveTasks();
//             renderTasks();
//         }
//     });

//     taskTable.addEventListener("click", (e) => {
//         const index = e.target.dataset.index;
//         if (e.target.classList.contains("status-btn")) {
//             const colors = ["red", "orange", "green"];
//             let currentColor = colors.indexOf(tasks[index].status);
//             tasks[index].status = colors[(currentColor + 1) % colors.length];
//             saveTasks();
//             renderTasks();
//         } else if (e.target.classList.contains("reset-btn")) {
//             tasks[index].status = "red";
//             saveTasks();
//             renderTasks();
//         } else if (e.target.classList.contains("delete-btn")) {
//             tasks.splice(index, 1);
//             saveTasks();
//             renderTasks();
//         }
//     });

//     resetAllBtn.addEventListener("click", () => {
//         tasks.forEach(task => task.status = "red");
//         saveTasks();
//         renderTasks();
//     });

//     renderTasks();
// });

document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.querySelector("#taskTable tbody");
    const addTaskBtn = document.getElementById("addTask");
    const resetAllBtn = document.getElementById("resetAll");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskTable.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.name}</td>
                <td>
                    <button class="status-btn" data-index="${index}" style="background-color: ${task.status}; padding: 12px; border-radius:12px; border: 2px solid #ddd;"></button>
                </td>
                <td>
                    <button class="reset-btn" data-index="${index}">Reset</button>
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            taskTable.appendChild(row);
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", () => {
        const taskName = prompt("Ingrese el nombre de el cliente:");
        if (taskName) {
            tasks.push({ name: taskName, status: "red" }); // Ahora el estado por defecto es rojo
            saveTasks();
            renderTasks();
        }
    });

    taskTable.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("status-btn")) {
            if (tasks[index].status !== "green") { // Si no está en verde, permite cambiar
                const colors = ["red", "orange", "green"];
                let currentColor = colors.indexOf(tasks[index].status);
                tasks[index].status = colors[(currentColor + 1) % colors.length];
                saveTasks();
                renderTasks();
            }
        } else if (e.target.classList.contains("reset-btn")) {
            tasks[index].status = "red"; // Ahora el reset vuelve al estado rojo
            saveTasks();
            renderTasks();
        } else if (e.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    resetAllBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro que deseas resetear todas las tareas?")) { // Mensaje de confirmación
            tasks.forEach(task => task.status = "red");
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});