/*
  =============================================
  PROJECT: My To Do List App - JavaScript
  AUTHOR: dhruba2601
  DATE: 2026
  GITHUB: https://github.com/dhruba2601
  =============================================
  WHAT THIS FILE DOES:
  JavaScript is the BRAIN of our To Do app.
  HTML gives structure. CSS gives looks.
  JavaScript gives BEHAVIOUR.

  HOW IT WORKS:
  1. Page loads → loadTasks() reads saved tasks from
     browser storage and displays them on screen
  2. User types task → clicks Add → addTask() runs
  3. addTask() saves to storage + shows on screen
  4. Delete button → removes from screen + storage
  5. Checkbox → strikethrough text when checked

  KEY IMPROVEMENT IN THIS VERSION:
  One function createTaskElement() builds the task row.
  Both addTask() and loadTasks() use this same function.
  No duplicate code — change one place, affects everywhere.
  =============================================
*/


/* =============================================
   STEP 1: LOAD SAVED TASKS FROM BROWSER STORAGE
   localStorage stores data permanently in browser.
   Even after closing and reopening — data is there.

   JSON.parse() converts saved text back to array.
   || [] means: if nothing saved yet, use empty array.
   ============================================= */
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


/* =============================================
   STEP 2: FIND HTML ELEMENTS
   getElementById() finds elements by their ID.
   IDs are set in HTML like: id="taskInput"
   ============================================= */
const taskInput = document.getElementById('taskInput');  // Text input box
const addBtn    = document.getElementById('addBtn');     // Blue Add button
const taskList  = document.getElementById('taskList');   // Empty <ul> list


/* =============================================
   STEP 3: createTaskElement() - CORE FUNCTION
   This function builds ONE complete task row.
   It takes taskText (e.g. "Buy milk") as input
   and returns a fully built <li> element.

   WHY ONE FUNCTION?
   Both adding new tasks AND loading saved tasks
   need the same task row structure.
   Instead of writing the same code twice,
   we write it once here and call it from both places.
   ============================================= */
function createTaskElement(taskText) {

    // Create the task row
    const li = document.createElement('li');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Create task text label
    const span = document.createElement('span');
    span.textContent = taskText;

    // Checkbox change: strikethrough when checked
    // 'change' fires when checkbox is checked/unchecked
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through'; // Strike text
            span.style.color = '#aaa';                  // Grey color
        } else {
            span.style.textDecoration = 'none';         // Remove strike
            span.style.color = '#333';                  // Dark color
        }
    });

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn'); // Adds red color from CSS

    // Delete button click: remove task from screen and storage
    deleteBtn.addEventListener('click', function() {
        li.remove(); // Remove from screen

        // filter() keeps all tasks EXCEPT the deleted one
        tasks = tasks.filter(function(t) {
            return t !== taskText;
        });

        // Save updated list to browser storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Group checkbox and text together on LEFT side
    // Delete button stays on RIGHT side
    // Result: [ checkbox  task text ]        [ Delete ]
    const leftGroup = document.createElement('div');
    leftGroup.style.display    = 'flex';
    leftGroup.style.alignItems = 'center';
    leftGroup.style.gap        = '10px';

    leftGroup.appendChild(checkbox); // Checkbox on left
    leftGroup.appendChild(span);     // Text next to checkbox

    // Assemble complete task row
    li.appendChild(leftGroup);  // Left side: checkbox + text
    li.appendChild(deleteBtn);  // Right side: delete button

    // Return the finished <li> element to the caller
    return li;
}


/* =============================================
   STEP 4: addTask() - ADD A NEW TASK
   Runs when user clicks the Add button.
   ============================================= */
function addTask() {
    const taskText = taskInput.value.trim();
    // .trim() removes accidental spaces from start/end

    // Stop if input is empty
    if (taskText === '') {
        alert('Please enter a task');
        return; // Exit — don't add empty task
    }

    // Build task row using our core function
    const li = createTaskElement(taskText);

    // Show task on screen
    taskList.appendChild(li);

    // Add to tasks array and save to browser storage
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // JSON.stringify converts array to text for storage
    // Example: ["Buy milk", "Go gym"] becomes '["Buy milk","Go gym"]'

    // Clear input box for next task
    taskInput.value = '';
}


/* =============================================
   STEP 5: loadTasks() - LOAD SAVED TASKS ON STARTUP
   Runs automatically when page opens.
   Reads saved tasks from localStorage and
   displays them using createTaskElement().
   ============================================= */
function loadTasks() {
    tasks.forEach(function(taskText) {
        const li = createTaskElement(taskText); // Build task row
        taskList.appendChild(li);               // Show on screen
    });
}


/* =============================================
   STEP 6: CONNECT BUTTON AND LOAD ON START
   ============================================= */
addBtn.addEventListener('click', addTask); // Button click runs addTask()
loadTasks(); // Load saved tasks when page opens


/*
  =============================================
  FULL FLOW SUMMARY:

  PAGE OPENS:
  localStorage → tasks array → loadTasks()
  → createTaskElement() for each saved task
  → tasks appear on screen

  USER ADDS TASK:
  Types "Buy milk" → clicks Add → addTask()
  → createTaskElement("Buy milk")
  → task appears on screen + saved to localStorage

  USER DELETES TASK:
  Clicks Delete → li.remove()
  → filter() removes from array
  → localStorage updated

  USER COMPLETES TASK:
  Clicks checkbox → strikethrough appears
  Clicks again → strikethrough removed
  =============================================
*/
