import { createContext, useContext, useEffect, useState } from "react";
import useTasks from "../custom hooks/useTasks";

const TasksContext = createContext();

//* export context for consumers
export const useTaskContext = () => useContext(TasksContext);

//* export context for provider
export const TaskContextProvider = ({ children }) => {
  const { taskList, addTask, removeTask, updateTask } = useTasks();

  const tasksContext = {
    test: "prova context",
    taskList,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
};
