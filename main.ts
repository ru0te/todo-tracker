import PromptSync from 'prompt-sync';
import fs from 'node:fs';
import { Task } from './types';
const prompt = PromptSync({ sigint: true });

const TASKS_FILE = 'tasks.json';
let idCounter: number = 0;

function saveTasks(tasks: Task[]) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function loadTasks(): Task[] {
  if (fs.existsSync(TASKS_FILE)) {
    return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8'));
  }
  return [];
}

type CommandHandler = (args: string[], tasks: Task[]) => void;

const commands: Record<string, CommandHandler> = {
  add: (args, tasks) => {
    const desc = args.join(' ');
    if (!desc) return console.log('Error: Task description cannot be empty.');

    idCounter += 1;
    const now = new Date().toLocaleString();
    tasks.push({
      id: idCounter,
      description: desc,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
    saveTasks(tasks);
    console.log('Task added successfully.');
  },

  list: (_, tasks) => {
    if (tasks.length === 0) return console.log('No tasks found.');
    for (const task of tasks) {
      console.log(task);
    }
  },

  update: (args, tasks) => {
    const targetId = Number(args[0]);
    const taskToUpdate = tasks.find((task) => task.id === targetId);
    if (!taskToUpdate)
      return console.log(`Error: Task ID ${args[0]} not found.`);

    taskToUpdate.description = prompt('Enter update: ');
    taskToUpdate.updatedAt = new Date().toLocaleString();
    saveTasks(tasks);
    console.log('Task updated successfully.');
  },

  delete: (args, tasks) => {
    const targetId = Number(args[0]);
    const index = tasks.findIndex((task) => task.id === targetId);
    if (index === -1)
      return console.log(`Error: Task ID ${args[0]} not found.`);

    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log('Task deleted successfully.');
  },

  mark: (args, tasks) => {
    const targetId = Number(args[0]);
    const taskToMark = tasks.find((task) => task.id === targetId);
    if (!taskToMark) return console.log(`Error: Task ID ${args[0]} not found.`);

    taskToMark.completed = true;
    saveTasks(tasks);
    console.log('Task marked as done.');
  },
};

function main() {
  const allTasks: Task[] = loadTasks();
  if (allTasks.length > 0) {
    idCounter = Math.max(...allTasks.map((t) => t.id));
  }
  console.log('--- Task Manager CLI ---');
  console.log('Available commands:');
  console.log('  add <description>  (e.g., add Buy milk)');
  console.log('  list               (Shows all tasks)');
  console.log('  update <id>        (Updates a task description)');
  console.log('  delete <id>        (Removes a task)');
  console.log('  mark <id>          (Marks task as complete)');
  console.log('  q                  (Quit)');
  console.log('------------------------\n');

  while (true) {
    const userInput = prompt('> ');
    if (!userInput.trim()) continue;
    if (userInput.toLowerCase() === 'q') break;

    const parts = userInput.trim().split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const executeCommand = commands[cmdName];
    if (executeCommand) {
      executeCommand(args, allTasks);
    } else {
      console.log(
        `Unknown command: "${cmdName}". Type list, add, update, delete, or mark.`,
      );
    }
    console.log('');
  }
}

main();
