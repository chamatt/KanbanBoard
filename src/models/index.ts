import { createStore, createTypedHooks } from "easy-peasy";
import { tasksModel, TasksModel } from "./tasks";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
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

const persistConfig = {
  key: "root",
  storage: storage,
};
export const store = createStore(storeModel, {
  reducerEnhancer: (reducer) => persistReducer(persistConfig, reducer),
});

export const persistor = persistStore(store);
