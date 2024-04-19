document.addEventListener('DOMContentLoaded', function () {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');
    const saveButton = document.getElementById('saveButton');

    renderTodos();

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
    });

    saveButton.addEventListener('click', function () {
        downloadTodos();
    });

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(function (todo, index) {
            const li = document.createElement('li');
            const todoText = document.createElement('span');
            todoText.textContent = `${index + 1}: ${todo}`;
            li.appendChild(todoText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', function () {
                deleteTodo(index);
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            newTodoInput.value = '';
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function downloadTodos() {
        // Format todos as a numbered list
        const formattedTodos = todos.map((todo, index) => `${index + 1}: ${todo}`).join('\n');
    
        // Create a Blob from the formatted todos
        const blob = new Blob([formattedTodos], { type: 'text/plain' });
    
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create an <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todos.txt';
    
        // Append the <a> element to the body and trigger the download
        document.body.appendChild(a);
        a.click();
    
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
});
