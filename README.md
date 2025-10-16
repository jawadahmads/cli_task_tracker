# Task-Traker-CLI

Simple CLI todo list that stores tasks in `store.json`.

## Prerequisites

- Node.js (v14+ recommended)
- A Linux shell (examples below use bash)

## Install / Run

Clone or place the project folder and run commands with node:

Example:

```bash
node app.js <command> [args...]
```

## Initialize the store

Create the `store.json` file (empty list) before adding tasks:

```bash
# from project root
node app.js init
# Output: [OK] Store initialized.
```

If `store.json` already exists:

```bash
node app.js init
# Output: [WARN] Store is already initialized.
```

## Commands & Usage

- init

  - Initialize the data store.
  - Usage: `node app.js init`

- add <task> [description]

  - Add a new task (status defaults to `todo`).
  - Usage: `node app.js add "Buy milk" "2 liters"`

- list [all|done|todo|in-progress]

  - List tasks (default: all).
  - Usage:
    - `node app.js list`
    - `node app.js list todo`
    - `node app.js list in-progress`

- update <id> <new task text>

  - Update the task text for the given id.
  - Usage: `node app.js update 2 "Buy almond milk"`

- delete <id>

  - Delete task by id.
  - Usage: `node app.js delete 3`

- mark-in-progress <id>

  - Mark a task as in-progress.
  - Usage: `node app.js mark-in-progress 4`

- mark-done <id>
  - Mark a task as done.
  - Usage: `node app.js mark-done 4`

## Examples

Add tasks:

```bash
node app.js add "Write README" "Add usage examples"
node app.js add "Fix bug" "store parsing issue"
```

List all:

```bash
node app.js list
```

Mark a task in-progress:

```bash
node app.js mark-in-progress 1
```

Mark done:

```bash
node app.js mark-done 1
```

Update a task:

```bash
node app.js update 2 "Fix parsing bug and add tests"
```

Delete a task:

```bash
node app.js delete 2
```

## Data file (store.json)

- Located at project root.
- Contains an array of task objects, for example:

```json
[
  {
    "id": 1,
    "task": "Write README",
    "status": "todo",
    "description": "Add usage examples",
    "createdAt": 1630000000000,
    "updateAt": 1630000000000
  }
]
```

## Notes

- IDs are numeric and assigned as (current length + 1) when adding.
- CLI prints colored, prefixed logs (OK/WARN/ERROR).
- If you edit `store.json` manually, keep it valid JSON (an array
