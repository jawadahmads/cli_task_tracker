const process = require("node:process");
const fs = require("node:fs");
const { Store } = require("./store.js");

// json store
let store;

// ANSI colors for prettier logs
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

function pretty(level, msg) {
  const prefix =
    level === "error"
      ? `${BOLD}${RED}[ERROR]${RESET}`
      : level === "warn"
      ? `${BOLD}${YELLOW}[WARN]${RESET}`
      : `${BOLD}${GREEN}[OK]${RESET}`;
  const out = `${prefix} ${msg}`;
  if (level === "error") {
    console.error(out);
  } else {
    console.log(out);
  }
}

function prettyInfo(title, lines = []) {
  console.log(`${BOLD}${CYAN}=== ${title} ===${RESET}`);
  lines.forEach((l) => console.log(`  - ${l}`));
}

// entry point
function main() {
  if (process.argv.length <= 2) {
    pretty(`${"warn"}`, "Missing command arguments.");
    prettyInfo("Examples", [
      "init                 -> Initialize store",
      "add <task> [desc]    -> Add a new task",
      "list [all|done|todo|in-progress] -> List tasks",
      "update <id> <task>   -> Update task text",
      "delete <id>          -> Delete task",
      "mark-in-progress <id>",
      "mark-done <id>",
    ]);
    return;
  }

  // argument recevied from the user
  const arg = process.argv[2];

  switch (arg) {
    case "init":
      initialStore();
      break;
    case "add":
      {
        const task = process.argv[3];
        const description = process.argv[4];
        add(task, description);
      }
      break;
    case "list":
      {
        const type = process.argv[3];
        list(type);
      }
      break;
    case "update":
      {
        const id = process.argv[3];
        const newTask = process.argv[4];
        update(id, newTask);
      }
      break;
    case "delete":
      {
        const todeleteId = process.argv[3];
        deleteTask(todeleteId);
      }
      break;
    case "mark-in-progress":
      {
        const progressId = process.argv[3];
        markInProgress(progressId);
      }
      break;
    case "mark-done":
      {
        const doneId = process.argv[3];
        markDone(doneId);
      }
      break;
    default:
      pretty("error", `Unknown command: ${arg}`);
  }
}

function markInProgress(id) {
  store = new Store();
  store.update();
  store.inProgress(id);
  pretty("ok", `Task ${id} marked in-progress.`);
}

function markDone(id) {
  store = new Store();
  store.update();
  store.doneMark(id);
  pretty("ok", `Task ${id} marked done.`);
}

function deleteTask(id) {
  store = new Store();
  store.update();
  store.taskDelete(id);
  pretty("ok", `Task ${id} deleted.`);
}
function update(id, newTask) {
  store = new Store();
  store.update();
  store.taskUpdate(id, newTask);
  pretty("ok", `Task ${id} updated.`);
}

function formatList(arr) {
  try {
    return JSON.stringify(arr, null, 2);
  } catch {
    return String(arr);
  }
}

function list(type) {
  store = new Store();
  store.update();
  if (!type || type === "all") {
    console.log(formatList(store.tasks));
  } else if (type === "done") {
    console.log(formatList(store.done));
  } else if (type === "in-progress") {
    console.log(formatList(store.listInProgress));
  } else if (type === "todo") {
    console.log(formatList(store.todo));
  } else {
    pretty("warn", `Unknown list type: ${type}. Use all|done|todo|in-progress`);
  }
}

function add(task, description) {
  store = new Store();
  if (!task) {
    pretty("error", "Please provide a task name to add.");
  } else {
    const id = store.tasks && store.tasks.length ? store.tasks.length + 1 : 1;
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
    pretty("ok", `Task added (id: ${id}).`);
  }
}

function initialStore() {
  const is = fs.existsSync("store.json");
  if (!is) {
    fs.writeFileSync("store.json", "[]");
    store = new Store();
    pretty("ok", "Store initialized.");
  } else {
    pretty("warn", "Store is already initialized.");
  }
}

// call main function
main();
//
