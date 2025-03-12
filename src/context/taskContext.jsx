import { createContext, useContext } from "react";

const TasksContext = createContext();

//* export context for consumers
export const useTaskContext = () => useContext(TasksContext);

//* export context for provider
export const TaskContextProvider = ({ children }) => {
  /* console.log(import.meta.env.VITE_API_URL); */

  const tasksContext = {
    test: "prova context",
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
};
