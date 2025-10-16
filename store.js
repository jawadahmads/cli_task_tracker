const path = require("node:path");
const fs = require("node:fs");

const storePath = path.join(__dirname, "store.json");

class Store {
  constructor() {
    this.taskStore = this.parse(fs.readFileSync(storePath));
  }

  parse(tasks) {
    return Array.from(JSON.parse(tasks));
  }

  get tasks() {
    return this.taskStore;
  }

  get listInProgress() {
    return this.taskStore.filter((task) => {
      return task.status === "in-progress";
    });
  }

  get done() {
    return this.taskStore.filter((task) => {
      return task.status === "done";
    });
  }

  get todo() {
    return this.taskStore.filter((task) => {
      return task.status === "todo";
    });
  }

  set addTask(task) {
    this.taskStore.push(task);
  }

  update() {
    fs.writeFileSync(storePath, JSON.stringify(this.taskStore));
  }

  get length() {
    return this.taskStore.length;
  }

  taskUpdate(id, newtask) {
    this.taskStore = this.taskStore.map((task) => {
      if (Number(task.id) === Number(id)) {
        return { ...task, task: newtask, updateAt: Date.now() };
      } else {
        return task;
      }
    });
    this.update();
    console.log("Task updated");
  }

  taskDelete(id) {
    if (
      this.taskStore.find((task) => Number(task.id) === Number(id)) ===
      undefined
    ) {
      return;
    }

    this.taskStore = this.taskStore.filter((task) => {
      if (Number(task.id) === Number(id)) {
        return false;
      } else {
        return true;
      }
    });
    this.update();
  }

  inProgress(id) {
    this.taskStore = this.taskStore.map((task) => {
      if (Number(task.id) === Number(id)) {
        return {
          ...task,
          status: "in-progress",
        };
      } else {
        return task;
      }
    });
    this.update();
  }

  doneMark(id) {
    this.taskStore = this.taskStore.map((task) => {
      if (Number(task.id) === Number(id)) {
        return {
          ...task,
          status: "done",
        };
      } else {
        return task;
      }
    });
    this.update();
  }
}

module.exports = {
  Store,
};
