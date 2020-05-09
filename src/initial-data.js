const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Wash the dishes", priority: "low" },
    "task-2": { id: "task-2", content: "Procratinate", priority: "high" },
    "task-3": {
      id: "task-3",
      content: "Do some actual work",
      priority: "medium",
    },
    "task-4": {
      id: "task-4",
      content: "Sleep, please! 😢😢😢😢",
      priority: "low",
    },
    "task-5": {
      id: "task-5",
      content: "Stay awake at all costs!",
      priority: "high",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: ["task-3", "task-4", "task-5"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};
export default initialData;
