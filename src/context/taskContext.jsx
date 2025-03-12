import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

//* export context for consumers
export const useTaskContext = () => useContext(TasksContext);

//* export context for provider
export const TaskContextProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [taskList, setTaskList] = useState();
  /* console.log("taskList", taskList); */

  useEffect(() => {
    (async () => {
      try {
        const fetchTaskList = await fetch(`${apiUrl}/tasks`);
        const taskListResponse = await fetchTaskList.json();
        /* console.log("taskListResponse", taskListResponse); */
        setTaskList(taskListResponse);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
