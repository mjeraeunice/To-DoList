// Selecting elements from the HTML file
const newTask = document.querySelector("#new-task");
const addButton = document.querySelector("#adding");
const incompleteTasks = document.querySelector("#incomplete-tasks");
const completedTasks = document.querySelector("#completed-tasks");

const createNewTask = (task) => {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";


  const label = document.createElement("label");
  label.innerText = task;
  const textInput = document.createElement("input");
  textInput.type = "text";


  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

 
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

 
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(textInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);


  return listItem;
};


const addTask = () => {

  const listItem = createNewTask(newTask.value);

 
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem);

  newTask.value = "";
};
const editTask = (listItem) => {

  const label = listItem.querySelector("label");
  const textInput = listItem.querySelector("input[type=text]");


  const isEditing = listItem.classList.contains("editing");

  if (isEditing) {

    label.innerText = textInput.value;
    listItem.classList.remove("editing");
  } else {

    textInput.value = label.innerText;
    listItem.classList.add("editing");
  }
};
const deleteTask = (listItem) => {
  
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
};


const completeTask = (listItem) => {

  completedTasks.appendChild(listItem);

  bindTaskEvents(listItem);
};


const incompleteTask = (listItem) => {
  incompleteTasks.appendChild(listItem);


  bindTaskEvents(listItem);
};


const bindTaskEvents = (listItem) => {
  const checkbox = listItem.querySelector("input[type=checkbox]");
  const editButton = listItem.querySelector(".edit");
  const deleteButton = listItem.querySelector(".delete");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completeTask(listItem);
    } else {
      incompleteTask(listItem);
    }
  });

  editButton.addEventListener("click", () => {
    editTask(listItem);
  });

  deleteButton.addEventListener("click", () => {
    deleteTask(listItem);
  });
};
addButton.addEventListener("click", () => {
  addTask();
});
for (let i = 0; i < incompleteTasks.children.length; i++) {
  bindTaskEvents(incompleteTasks.children[i]);
}

for (let i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i]);
}
