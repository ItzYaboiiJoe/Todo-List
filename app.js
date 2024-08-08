import { db } from './firebaseConfig.js';
import { collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');

    // Load todos with real-time updates from Firestore
    loadTodosRealTime();

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
    });

    function loadTodosRealTime() {
        onSnapshot(collection(db, 'todos'), (snapshot) => {
            todoList.innerHTML = ''; // Clear the current list
            snapshot.forEach(doc => {
                const todo = doc.data();
                console.log(`Real-time update: ${todo.title}, ID: ${doc.id}, Completed: ${todo.isCompleted}`);
                addTodoToDOM(todo.title, doc.id, todo.isCompleted);
            });
        });
    }

    async function addTodo() {
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            try {
                const docRef = await addDoc(collection(db, 'todos'), {
                    title: newTodo,
                    isCompleted: false // New todos are not completed by default
                });
                console.log(`Added todo: ${newTodo}, ID: ${docRef.id}`);
                newTodoInput.value = ''; // Clear input after adding
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }

    async function deleteTodo(id) {
        console.log(`Deleting todo with ID: ${id}`);
        await deleteDoc(doc(db, 'todos', id));
        document.getElementById(id).remove();
    }

    async function toggleComplete(id, isCompleted) {
        console.log(`Toggling completion for ${id} to ${isCompleted}`);
        try {
            await updateDoc(doc(db, 'todos', id), {
                isCompleted: isCompleted
            });
            console.log(`Successfully toggled completion for ${id} to ${isCompleted}`);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    function addTodoToDOM(todoTitle, id, isCompleted) {
        console.log(`Adding to DOM: ${todoTitle}, ID: ${id}, Completed: ${isCompleted}`);
        const li = document.createElement('li');
        li.id = id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function () {
            toggleComplete(id, checkbox.checked);
            const todoText = li.querySelector('span');
            todoText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });
        li.appendChild(checkbox);

        const todoSpan = document.createElement('span');
        todoSpan.textContent = todoTitle || "No Text";
        if (isCompleted) {
            todoSpan.style.textDecoration = 'line-through';
        }
        li.appendChild(todoSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function () {
            deleteTodo(id);
        });
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }
});
