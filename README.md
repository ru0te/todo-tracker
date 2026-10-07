# Todo Tracker

A lightweight command-line task manager built with TypeScript and Node.js. It lets you add, list, update, delete, and complete tasks from the terminal.

## Features

- Add new tasks with a short description
- View all saved tasks
- Update an existing task
- Delete tasks you no longer need
- Mark tasks as complete
- Store task metadata such as creation and update timestamps

## Project structure

- `main.ts` — CLI entry point and command handling logic
- `types.ts` — shared TypeScript task model
- `package.json` — project metadata and dependencies

## Tech stack

- TypeScript
- Node.js
- `prompt-sync` for interactive CLI input
- `tsx` for running TypeScript directly

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ru0te/todo-tracker.git
   cd todo-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the CLI with:

```bash
npx tsx main.ts
```

Available commands:

- `add <description>` — add a new task
- `list` — display all tasks
- `update <id>` — update the description of a task
- `delete <id>` — remove a task
- `mark <id>` — mark a task as completed
- `q` — quit the application

Example:

```bash
> add Buy milk
> list
> mark 1
> update 1
> delete 2
> q
```

## Notes

The app keeps tasks in persistent storage. It is ideal as a simple local task tracker for quick command-line use.

## License

MIT
