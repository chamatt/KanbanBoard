import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";

type Priority = "high" | "medium" | "low" | "none";

export interface Task {
  id: string;
  content: string;
  priority: Priority;
}

export interface TaskWithStatus {
  id: string;
  content: string;
  priority: Priority;
  statusId: string;
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
  setTasks: Action<TasksModel, TasksData>;
  createTask: Action<TasksModel, Partial<TaskWithStatus>>;
  deleteTask: Thunk<TasksModel, { id: string }>;
  editTask: Action<TasksModel, Partial<Task>>;
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
  setTasks: action((state, payload) => {
    state.data.tasks = payload;
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
  createTask: action((state, payload) => {
    const uuid = uuidv4();
    if (payload.statusId) {
      state.data.tasks = {
        byId: {
          ...state.data.tasks.byId,
          [uuid]: {
            id: uuid,
            content: payload?.content || "New Task",
            priority: "none",
          },
        },
        allIds: [...state.data.tasks.allIds, uuid],
      };
      state.data.status = {
        ...state.data.status,
        byId: {
          ...state.data.status.byId,
          [payload.statusId]: {
            ...state.data.status.byId[payload.statusId],
            tasks: [...state.data.status.byId[payload.statusId].tasks, uuid],
          },
        },
      };
    }
  }),
  editTask: action((state, payload) => {
    if (payload?.id) {
      state.data.tasks = {
        byId: {
          ...state.data.tasks.byId,
          [payload.id]: {
            ...state.data.tasks.byId[payload.id],
            content:
              payload.content || state.data.tasks.byId[payload.id].content,
          },
        },
        allIds: [...state.data.tasks.allIds],
      };
    } else return state;
  }),
  deleteTask: thunk((actions, payload, { getState }) => {
    const tasks = getState().data.tasks;
    const status = getState().data.status;
    const removedTaskById = (id: string, objTasks: TasksData): TasksData => {
      const { [id]: removed, ...byId } = objTasks.byId;
      const allIds = _.without(objTasks.allIds, payload.id);
      return {
        ...objTasks,
        byId,
        allIds,
      };
    };
    const removedTasksFromStatus = (
      id: string,
      objStatus: StatusData
    ): StatusData => {
      const byId = _.mapValues(objStatus.byId, (stat) => {
        return {
          ...stat,
          tasks: _.without(stat.tasks, id),
        };
      });
      return {
        ...objStatus,
        byId,
      };
    };

    actions.setTasks(removedTaskById(payload.id, tasks));
    actions.setStatus(removedTasksFromStatus(payload.id, status));
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
