// let start creating a simple task tracker cli

// first we have to grab the arguments from the user

const process = require("node:process");
const fs = require("node:fs");
const { Store } = require("./store.js");
const { stopCoverage } = require("node:v8");

let store;

// entry point
function main() {
  if (process.argv.length <= 2) {
    console.log("-----Please add some argument's-----");
    console.log("Here's some examples: ");
    console.log(
      `-> Add, Update, and Delete tasks\n-> Mark a task as in progress or done\n-> List all tasks\n-> List all tasks that are done\n-> List all tasks that are not done\n-> List all tasks that are in progress`
    );
  }
  const command = process.argv[2];

  switch (command) {
    case "init":
      initialStore();
      break;
    case "add":
      const task = process.argv[3];
      add(task);
      break;
    case "list":
      const type = process.argv[3];
      list(type);
      break;
    case "update":
      const id = process.argv[3];
      const newTask = process.argv[4];
      update(id, newTask);
      break;
    case "delete":
      const todeleteId = process.argv[3];
      deleteTask(todeleteId);
      break;
    case "mark-in-progress":
      const progressId = process.argv[3];
      markInProgress(progressId);
      break;
    case "mark-done":
      const doneId = process.argv[3];
      markDone(doneId);
      break;
    default:
      console.log(`Options doesn't exists`);
  }
}

function markInProgress(id) {
  store = new Store();
  // map and mark in-progress
  store.update();
  store.inProgress(id);
}

function markDone(id) {
  store = new Store();
  store.update();
  store.doneMark(id);
}

function deleteTask(id) {
  store = new Store();
  store.update();
  store.taskDelete(id);
}
function update(id, newTask) {
  // initail the store
  store = new Store();

  store.update();
  store.taskUpdate(id, newTask);
}

function list(type) {
  store = new Store();
  store.update();
  if (!type || type === "all") {
    console.log(store.tasks);
  } else if (type === "done") {
    console.log(store.done);
  } else if (type === "in-progress") {
    console.log(store.listInProgress);
  } else if (type === "todo") {
    console.log(store.todo);
  }
}

function add(task, description) {
  store = new Store();
  if (!task) {
    console.log("please add task!");
  } else {
    const id = store.length + 1;
    const taskObj = {
      id: id,
      task: task,
      status: "todo",
      description: description,
      createdAt: Date.now(),
      updateAt: Date.now(),
    };

    store.addTask = taskObj;
    store.update();
  }
}

function initialStore() {
  // it returns the file descriptorsteps
  const is = fs.existsSync("store.json");
  if (!is) {
    fs.writeFileSync("store.json", "[]");
    store = new Store();
    // opened file must be closed
    console.log("Store is initialized");
  } else {
    console.log("Store is already initialized");
  }
}
main();
