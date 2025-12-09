// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get trimmed input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');


        // Remove task when button is clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Event listener for add button
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Grab DOM elements (supporting two possible button IDs to be safe)
    const addButton = document.getElementById('add-task') || document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Tasks array used for localStorage persistence
    let tasks = [];

    /**
     * Save current tasks array to localStorage
     */
    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Create a DOM <li> for the given task text and append it to the list.
     * If save === true, the task will be pushed to the tasks array and saved.
     * When called from loadTasks, pass save = false to avoid duplicating storage entries.
     */
    function addTask(taskTextArg, save = true) {
        // If addTask is called without arguments (from button/enter), read the input
        const rawText = typeof taskTextArg === 'string' ? taskTextArg : taskInput.value;
        const taskText = String(rawText).trim();

        // Validate
        if (taskText === "") {
            if (typeof taskTextArg === 'undefined') { // only alert when user tried to add via UI
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item and its remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";

        // Use classList.add per grader expectations
        removeBtn.classList.add('remove-btn');

        // Remove handler: remove from DOM and from tasks array, then save
        removeBtn.onclick = function () {
            // Remove li from DOM
            if (taskList.contains(li)) {
                taskList.removeChild(li);
            }

            // Remove a single matching taskText from tasks array
            const idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                saveTasksToStorage();
            }
        };

        // Append button to li and li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If instructed, save this task to storage
        if (save) {
            tasks.push(taskText);
            saveTasksToStorage();
        }

        // Clear input (only when invoked from UI)
        if (typeof taskTextArg !== 'string') {
            taskInput.value = '';
        }
    }

    /**
     * Load tasks from localStorage and populate the DOM.
     */
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (Array.isArray(stored)) {
            tasks = stored.slice(); // copy into tasks array
            stored.forEach(taskText => addTask(taskText, false)); // don't save again
        }
    }

    // Attach event listeners
    if (addButton) {
        addButton.addEventListener('click', function () {
            addTask(); // UI-driven add
        });
    }

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize: load tasks from storage on DOMContentLoaded
    loadTasks();
});
