import { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

import useTasks from "../custom hooks/useTasks";

const TasksContext = createContext();

//* export context for consumers
export const useTaskContext = () => useContext(TasksContext);

//* export context for provider
export const TaskContextProvider = ({ children }) => {
  const { taskList, addTask, removeTask, updateTask, removeMultipleTasks } =
    useTasks();

  const formatStatusDesign = (status) => {
    switch (status) {
      case "To do":
        return <i className="fa-solid fa-xmark fa-lg"></i>;
      case "Doing":
        return <i className="fa-solid fa-spinner fa-lg"></i>;
      case "Done":
        return <i className="fa-solid fa-check fa-lg"></i>;
      default:
        return <i className="fa-solid fa-xmark fa-lg"></i>;
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY - hh:mm:ss");
  };

  const tasksContext = {
    test: "prova context",
    taskList,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
    formatStatusDesign,
    formatDate,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
};
