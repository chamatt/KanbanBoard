import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  content: string;
  priority: Priority;
}

export interface Status {
  id: string;
  title: string;
  tasks: string[];
}

export interface TasksByStatus {
  id: string;
  title: string;
  tasks: Task[];
}

export interface TasksData {
  byId: {
    [key: string]: Task;
  };
  allIds: string[];
}

export interface StatusData {
  byId: {
    [key: string]: Status;
  };
  allIds: string[];
}
export interface Data {
  tasks: TasksData;
  status: StatusData;
}

export interface TasksModel {
  data: Data;
  tasksByStatus: Computed<TasksModel, TasksByStatus[]>;
  setStatus: Action<TasksModel, StatusData>;
  createStatus: Action<TasksModel, Partial<Status>>;
  editStatus: Action<TasksModel, Partial<Status>>;
  moveTask: Thunk<TasksModel, DropResult>;
}

const INITIAL_STATE: Data = {
  tasks: {
    byId: {
      "task-1": {
        id: "task-1",
        content: "Wash the dishes",
        priority: "low" as Priority,
      },
      "task-2": {
        id: "task-2",
        content: "Procratinate",
        priority: "high" as Priority,
      },
      "task-3": {
        id: "task-3",
        content: "Do some actual work",
        priority: "medium" as Priority,
      },
      "task-4": {
        id: "task-4",
        content: "Sleep, please! 😢😢😢😢",
        priority: "low" as Priority,
      },
      "task-5": {
        id: "task-5",
        content: "Stay awake at all costs!",
        priority: "high" as Priority,
      },
    },
    allIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
  },
  status: {
    byId: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        tasks: ["task-1", "task-2"],
      },
      "column-2": {
        id: "column-2",
        title: "Doing",
        tasks: ["task-3", "task-4", "task-5"],
      },
    },
    allIds: ["column-1", "column-2"],
  },
};

export const tasksModel: TasksModel = {
  data: INITIAL_STATE,
  tasksByStatus: computed((state) => {
    const { tasks, status } = state.data;
    const statusValues = status.allIds.map((id) => status.byId[id]);
    console.log(statusValues);
    const resolveTask = (taskId: string) => tasks.byId[taskId];
    const mapTasks = (taskAllIds: string[]) => taskAllIds.map(resolveTask);
    return statusValues.map((status: Status) => ({
      ...status,
      tasks: mapTasks(status.tasks),
    }));
  }),

  setStatus: action((state, payload) => {
    state.data.status = payload;
  }),
  createStatus: action((state, payload) => {
    const uuid = uuidv4();
    state.data.status = {
      byId: {
        ...state.data.status.byId,
        [uuid]: {
          id: uuid,
          title: payload.title || "New Column",
          tasks: [],
        },
      },
      allIds: [...state.data.status.allIds, uuid],
    };
  }),
  editStatus: action((state, payload) => {
    if (payload?.id) {
      state.data.status = {
        byId: {
          ...state.data.status.byId,
          [payload.id]: {
            ...state.data.status.byId[payload.id],
            title: payload.title || state.data.status.byId[payload.id].title,
          },
        },
        allIds: [...state.data.status.allIds],
      };
    } else return state;
  }),

  moveTask: thunk((actions, payload, { getState }) => {
    const { destination, source, draggableId } = payload;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const sourceColumn = getState().data.status.byId[source.droppableId];
    const destinationColumn = getState().data.status.byId[
      destination.droppableId
    ];
    const sourceTaskIds = [...sourceColumn.tasks];
    const destinationTaskIds = [...destinationColumn.tasks];

    if (destination.droppableId === source.droppableId) {
      sourceTaskIds.splice(source.index, 1);
      sourceTaskIds.splice(destination.index, 0, draggableId);
      actions.setStatus({
        ...getState().data.status,
        byId: {
          ...getState().data.status.byId,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTaskIds,
          },
        },
      });
    } else {
      sourceTaskIds.splice(source.index, 1);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      actions.setStatus({
        ...getState().data.status,
        byId: {
          ...getState().data.status.byId,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTaskIds,
          },
          [destination.droppableId]: {
            ...destinationColumn,
            tasks: destinationTaskIds,
          },
        },
      });
    }
  }),
};
