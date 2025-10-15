// let start creating a simple task tracker cli

// first we have to grab the arguments from the user

const process = require("node:process");
const fs = require("node:fs");
const { Store } = require("./store.js");

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
      list();
      break;

    default:
      console.log(`Options doesn't exists`);
  }
}

function list() {
  store = new Store();
  store.update();
  console.log(store.tasks);
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
      description: description,
      createdAt: Date.now(),
      updateAt: Date.now(),
    };

    store.addTask = taskObj;
    store.update();
  }
}

function initialStore() {
  // it returns the file descriptor
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
