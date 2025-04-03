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
//         const taskName = prompt("Ingrese el nombre de el cliente:");
//         if (taskName) {
//             tasks.push({ name: taskName, status: "red" }); // Ahora el estado por defecto es rojo
//             saveTasks();
//             renderTasks();
//         }
//     });

//     taskTable.addEventListener("click", (e) => {
//         const index = e.target.dataset.index;
//         if (e.target.classList.contains("status-btn")) {
//             if (tasks[index].status !== "green") { // Si no está en verde, permite cambiar
//                 const colors = ["red", "orange", "green"];
//                 let currentColor = colors.indexOf(tasks[index].status);
//                 tasks[index].status = colors[(currentColor + 1) % colors.length];
//                 saveTasks();
//                 renderTasks();
//             }
//         } else if (e.target.classList.contains("reset-btn")) {
//             tasks[index].status = "red"; // Ahora el reset vuelve al estado rojo
//             saveTasks();
//             renderTasks();
//         } else if (e.target.classList.contains("delete-btn")) {
//             tasks.splice(index, 1);
//             saveTasks();
//             renderTasks();
//         }
//     });

//     resetAllBtn.addEventListener("click", () => {
//         if (confirm("¿Estás seguro que deseas resetear todas las tareas?")) { // Mensaje de confirmación
//             tasks.forEach(task => task.status = "red");
//             saveTasks();
//             renderTasks();
//         }
//     });

//     renderTasks();
// });




// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (REEMPLAZA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "AIzaSyCQ8lVwdkCiWg0bmLZFZ1ezGl-rUvRLJeg",
    authDomain: "tareaspwa-66987.firebaseapp.com",
    projectId: "tareaspwa-66987",
    storageBucket: "tareaspwa-66987.appspot.com",  // CORREGIDO
    messagingSenderId: "103138070679",
    appId: "1:103138070679:web:6734ea6200767a02f199d2",
    measurementId: "G-D3SQNVX3LM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.querySelector("#taskTable tbody");
    const addTaskBtn = document.getElementById("addTask");
    const resetAllBtn = document.getElementById("resetAll");

    // Escuchar cambios en tiempo real
    onSnapshot(collection(db, "tasks"), (snapshot) => {
        let tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        renderTasks(tasks);
    });

    function renderTasks(tasks) {
        taskTable.innerHTML = "";
        tasks.forEach((task) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.name}</td>
                <td>
                    <button class="status-btn" data-id="${task.id}" style="background-color: ${task.status}; padding: 12px; border-radius:12px; border: 2px solid #ddd;"></button>
                </td>
                <td>
                    <button class="reset-btn" data-id="${task.id}">Reset</button>
                    <button class="delete-btn" data-id="${task.id}">Eliminar</button>
                </td>
            `;
            taskTable.appendChild(row);
        });
    }

    addTaskBtn.addEventListener("click", async () => {
        const taskName = prompt("Ingrese el nombre del cliente:");
        if (taskName) {
            await addDoc(collection(db, "tasks"), { name: taskName, status: "red" });
        }
    });

    taskTable.addEventListener("click", async (e) => {
        const taskId = e.target.dataset.id;
        const taskRef = doc(db, "tasks", taskId);

        if (e.target.classList.contains("status-btn")) {
            const taskSnapshot = await getDoc(taskRef);  // CORREGIDO
            if (taskSnapshot.exists()) {
                let task = taskSnapshot.data();
                if (task.status !== "green") { // Si no está en verde, permite cambiar
                    const colors = ["red", "orange", "green"];
                    let currentColor = colors.indexOf(task.status);
                    await updateDoc(taskRef, { status: colors[(currentColor + 1) % colors.length] });
                }
            }
        } else if (e.target.classList.contains("reset-btn")) {
            await updateDoc(taskRef, { status: "red" });
        } else if (e.target.classList.contains("delete-btn")) {
            await deleteDoc(taskRef);
        }
    });

    resetAllBtn.addEventListener("click", async () => {
        if (confirm("¿Estás seguro que deseas resetear todas las tareas?")) {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            querySnapshot.forEach(async (docData) => {
                await updateDoc(doc(db, "tasks", docData.id), { status: "red" });  // CORREGIDO
            });
        }
   });
});