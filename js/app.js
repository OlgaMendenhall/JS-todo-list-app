//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0]; // we get the first button on the page
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
  //create List Item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input"); /* here creating checkbox, which type is “input” */
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); /* here we creating editInput for user to edit the label*/      
  //button for edit action
  var editButton = document.createElement("button");      
  //button.delete
  var deleteButton = document.createElement("button");
  
  //each element needs modifying
  checkBox.type = "checkbox"; /* this will verify that we're creating a check box */
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";    /* assigning a class */
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString; /* it's the tasks string that we're passing in*/
  
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);  
  
  return listItem;
}


//Add a new task
var addTask = function() {  /* The addTask function is an event handler, it handles what happens when a specific event is triggered.*/
  console.log("Add task...");  
  //Create a new list item (task) with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";  /* it clears out the input, when you push "add" to add a task*/
}

//Edit an existing task
var editTask = function() {
  console.log("Edit task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if (containsClass) {
  
    //switch from .editMode
    //label text becomes the input's value
    label.innerText = editInput.value;
  } else {
    //switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
    
  //toggle .editMode on the parent (which is list item)
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");  
  var listItem = this.parentNode;   /* button is a child here - so button is 'this' */
  var ul = listItem.parentNode;
  
  //remove the parent (li) from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task completed...");
  //append the task li item to the #completed-tasks
  var listItem = this.parentNode;   /* checkbox is a child here - so checkbox 'this' */
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //append the task li item to the #incomplete-tasks
  var listItem = this.parentNode;   /* checkbox is a child here - so checkbox 'this' */
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind taskCompleted to checkbox
  checkBox.onchange = checkBoxEventHandler; /* we can check the checkbox with mouse or with keyboard, so we use .onchange, not .onclick*/
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

taskInput.addEventListener("keypress", keyPressed);  // bind to taskInput, not addButton

function keyPressed(k) {
  if (k.code == 'Enter')      // only if the key is "Enter"...
    addTask();                // ...add a new task (using same handler as the button)
  return false;               // no propagation or default
}

//Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {  
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over CompletedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {  
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}