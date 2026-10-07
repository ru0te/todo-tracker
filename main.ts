import PromptSync from 'prompt-sync';

type Task = {
  id: number;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

let idCounter: number = 0;

function createNewTask(desc: string): Task {
  const newId = idCounter + 1;
  return {
    id: newId,
    description: desc,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function viewAllTasks(tasks: Task[]) {
  for (const task of tasks) {
    console.log(task);
  }
}

function main() {
  const prompt = PromptSync({ sigint: true });
  const allTasks: Task[] = [];
  const choices: string[] = ['Add a task', 'View all tasks'];
  while (true) {
    for (let i = 0; i < choices.length; i++) {
      console.log(`${i + 1}. ${choices[i]}`);
    }
    const userInput = prompt('Choose an option - q to QUIT: ');
    if (userInput.toLowerCase() === 'q') {
      break;
    }
    switch (Number(userInput)) {
      case 1: {
        const newTask = prompt('Enter new task: ');
        allTasks.push(createNewTask(newTask));
      }
      case 2: {
        viewAllTasks(allTasks);
      }
    }
  }
}

main();
