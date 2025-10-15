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

  set addTask(task) {
    this.taskStore.push(task);
    console.log("Task Added successfully");
  }

  update() {
    fs.writeFileSync(storePath, JSON.stringify(this.taskStore));
  }

  get length() {
    return this.taskStore.length;
  }
}

module.exports = {
  Store,
};
