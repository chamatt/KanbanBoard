import { createStore, createTypedHooks } from "easy-peasy";
import { tasksModel, TasksModel } from "./tasks";

interface StoreModel {
  tasks: TasksModel;
}

const storeModel: StoreModel = {
  tasks: tasksModel,
};

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const store = createStore(storeModel);
