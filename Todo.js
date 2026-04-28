/*
  =============================================
  PROJECT: My To Do List App - JavaScript
  AUTHOR: dhruba2601
  =============================================
  WHAT THIS FILE DOES:
  JavaScript is the BRAIN of our To Do app.
  HTML gives structure. CSS gives looks.
  JavaScript gives BEHAVIOUR.

  WHAT HAPPENS WHEN USER CLICKS ADD:
  1. Read what user typed in the input box
  2. Check if input is empty — show alert if so
  3. Create a new task row (<li>)
  4. Inside the row: add checkbox, task text, delete button
  5. Checkbox click → strikethrough the text
  6. Delete click → remove the task from list
  7. Add the task row to the list on screen
  8. Clear the input box for next task
  =============================================
*/


/* =============================================
   STEP 1: FIND HTML ELEMENTS
   Before JavaScript can do anything,
   it needs to find the elements on the page.

   getElementById() finds ONE element by its ID.
   ID is set in HTML like: id="taskInput"
   ============================================= */

const taskInput = document.getElementById('taskInput');
// taskInput = the text input box where user types

const addBtn = document.getElementById('addBtn');
// addBtn = the blue Add button

const taskList = document.getElementById('taskList');
// taskList = the empty <ul> where tasks will appear


/* =============================================
   STEP 2: LISTEN FOR ADD BUTTON CLICK
   addEventListener waits silently until
   the Add button is clicked.
   When clicked — runs the function inside.
   ============================================= */

addBtn.addEventListener('click', function() {


    /* =============================================
       STEP 3: READ WHAT USER TYPED
       .value reads the current text in the input box
       Example: user typed "Buy milk" → taskText = "Buy milk"
       ============================================= */
    const taskText = taskInput.value;


    /* =============================================
       STEP 4: CHECK IF INPUT IS EMPTY
       If user clicks Add without typing anything,
       show an alert and stop — don't add empty task.
       return = exit the function immediately
       ============================================= */
    if (taskText === '') {
        alert('Please enter a task');
        return; /* Stop here — don't run the rest of the code */
    }


    /* =============================================
       STEP 5: CREATE THE TASK ROW (<li>)
       document.createElement() creates a new
       HTML element in memory (not on screen yet).
       We build it piece by piece, then add to page.
       ============================================= */
    const li = document.createElement('li');
    /* li is now an empty <li></li> in memory */


    /* =============================================
       STEP 6: CREATE THE CHECKBOX
       type = 'checkbox' makes it a tick box.
       When user checks it — task gets strikethrough.
       ============================================= */
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    /* checkbox is now <input type="checkbox"> */


    /* =============================================
       STEP 7: CREATE THE TASK TEXT
       <span> is an inline element to hold text.
       .textContent sets the text inside the span.
       Example: span shows "Buy milk"
       ============================================= */
    const span = document.createElement('span');
    span.textContent = taskText;
    /* span is now <span>Buy milk</span> */


    /* =============================================
       STEP 8: CHECKBOX CLICK — STRIKETHROUGH
       When checkbox state changes (checked/unchecked),
       this function runs.

       If checked → strikethrough + grey text (task done)
       If unchecked → remove strikethrough (task active)

       style.textDecoration = CSS text-decoration property
       style.color = CSS color property
       ============================================= */
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            /* Task marked as done */
            span.style.textDecoration = 'line-through'; /* Strike through text */
            span.style.color = '#aaa';                  /* Fade text to grey */
        } else {
            /* Task marked as not done */
            span.style.textDecoration = 'none';         /* Remove strikethrough */
            span.style.color = '#333';                  /* Restore dark text */
        }
    });


    /* =============================================
       STEP 9: CREATE THE DELETE BUTTON
       Red button on the right of each task.
       classList.add() adds the CSS class "delete-btn"
       which gives it the red color from CSS.
       ============================================= */
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    /* deleteBtn is now <button class="delete-btn">Delete</button> */


    /* =============================================
       STEP 10: DELETE BUTTON CLICK — REMOVE TASK
       When Delete is clicked — remove the entire
       task row (<li>) from the page.
       li.remove() deletes it completely from DOM.
       ============================================= */
    deleteBtn.addEventListener('click', function() {
        li.remove(); /* Removes this entire task row */
    });


    /* =============================================
       STEP 11: GROUP CHECKBOX AND TEXT TOGETHER
       We wrap checkbox and span inside a <div>
       so they stay together on the LEFT side.
       The delete button stays on the RIGHT side.

       Result:
       [ ☐  Buy milk ]              [ Delete ]
         ↑ leftGroup                    ↑ deleteBtn
       ============================================= */
    const leftGroup = document.createElement('div');
    leftGroup.style.display = 'flex';       /* Side by side */
    leftGroup.style.alignItems = 'center';  /* Vertically centered */
    leftGroup.style.gap = '10px';           /* Space between checkbox and text */

    leftGroup.appendChild(checkbox); /* Add checkbox to left group */
    leftGroup.appendChild(span);     /* Add text to left group */


    /* =============================================
       STEP 12: ASSEMBLE THE TASK ROW
       Now put everything together inside the <li>:
       - leftGroup (checkbox + text) on the left
       - deleteBtn on the right
       ============================================= */
    li.appendChild(leftGroup);  /* Add left group to task row */
    li.appendChild(deleteBtn);  /* Add delete button to task row */


    /* =============================================
       STEP 13: ADD TASK TO THE LIST ON SCREEN
       taskList is our <ul> element.
       appendChild() adds the new <li> inside it.
       Now the task appears on the screen!
       ============================================= */
    taskList.appendChild(li);


    /* =============================================
       STEP 14: CLEAR THE INPUT BOX
       Reset input to empty so user can type next task.
       Setting .value = '' clears the text box.
       ============================================= */
    taskInput.value = '';

}); /* end addBtn click listener */


/*
  =============================================
  FULL FLOW SUMMARY:

  User types "Buy milk" → clicks Add
  ↓
  JavaScript reads "Buy milk" from input
  ↓
  Creates: <li>
             <div> ← leftGroup
               <input type="checkbox">
               <span>Buy milk</span>
             </div>
             <button class="delete-btn">Delete</button>
           </li>
  ↓
  Adds the <li> to <ul id="taskList">
  ↓
  Clears the input box

  User checks checkbox → text gets strikethrough
  User clicks Delete → task disappears
  =============================================
*/