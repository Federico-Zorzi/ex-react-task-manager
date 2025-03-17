import { useEffect, useReducer, useState } from "react";

const useTasks = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  function reducerTasks(taskList, action) {
    switch (action.type) {
      case "SET_TASKS":
        return action.payload;

      case "ADD_TASK":
        return [...taskList, action.payload];

      case "REMOVE_TASK":
        return taskList.filter((t) => t.id !== action.payload);

      case "UPDATE_TASK":
        const { id, taskModified } = action.payload;
        let updateTask = [...taskList];

        const findTaskIndex = updateTask.findIndex((t) => t.id === id);

        updateTask[findTaskIndex] = {
          ...updateTask[findTaskIndex],
          title: taskModified.task.title,
          status: taskModified.task.status,
          description: taskModified.task.description,
        };

        return updateTask;

      case "REMOVE_MULTIPLE_TASKS":
        return taskList.filter((t) => !action.payload.includes(t.id));

      default:
        return taskList;
    }
  }

  const [taskList, dispatch] = useReducer(reducerTasks, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchTaskList = await fetch(`${apiUrl}/tasks`);
        const taskListResponse = await fetchTaskList.json();
        /* console.log("taskListResponse", taskListResponse); */
        dispatch({ type: "SET_TASKS", payload: taskListResponse });
      } catch (err) {
        console.error("Errore:", err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async ({ title, status, description }) => {
    try {
      if (
        taskList.some(
          (t) => t.title.toLowerCase().trim() === title.toLowerCase().trim()
        )
      ) {
        throw new Error(
          `Il nome della task è uguale a quello di un'altra task già presente nella lista...`
        );
      }

      const fetchAddTask = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status,
          description,
        }),
      });

      if (!fetchAddTask.ok) {
        throw new Error(
          `Errore nella comunicazione con il server: ${fetchAddTask.status} - ${fetchAddTask.statusText}`
        );
      }

      const resAddTask = await fetchAddTask.json();

      if (!resAddTask.success) {
        throw new Error(
          resAddTask.message ||
            "Non è stato possibile aggiungere una nuova task"
        );
      }

      dispatch({ type: "ADD_TASK", payload: resAddTask.task });
      return {
        success: resAddTask.success,
        message: "Task aggiunta con successo!",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const removeTask = async (taskId) => {
    const taskSelected = taskList.filter((t) => taskId === t.id);

    try {
      const fetchRemoveTask = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!fetchRemoveTask.ok) {
        throw new Error(
          `Errore nella comunicazione con il server: ${fetchRemoveTask.status} - ${fetchRemoveTask.statusText}`
        );
      }

      const resRemove = await fetchRemoveTask.json();

      if (!resRemove.success) {
        throw new Error("Non è stato possibile eliminare la seguente task!");
      }

      alert(
        `Task "${taskSelected[0].title}" n°${taskId} è stata eliminata con successo...`
      );

      dispatch({ type: "REMOVE_TASK", payload: taskId });

      return {
        success: resRemove.success,
        message: "Task Eliminata con successo!",
      };
    } catch (err) {
      /* console.error("Errore:", err.message); */
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const updateTask = async (taskUpdated, id) => {
    /* console.log("Update task", taskUpdated, id); */
    try {
      if (
        taskList.some(
          (t) =>
            t.id !== id &&
            t.title.toLowerCase().trim() ===
              taskUpdated.title.toLowerCase().trim()
        )
      ) {
        throw new Error(
          `Il nome della task è uguale a quello di un'altra task già presente nella lista...`
        );
      }

      const fetchUpdateTask = await fetch(`${apiUrl}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskUpdated),
      });

      if (!fetchUpdateTask.ok) {
        throw new Error(
          `Errore nella comunicazione con il server: ${fetchUpdateTask.status} - ${fetchUpdateTask.statusText}`
        );
      }

      const taskModified = await fetchUpdateTask.json();

      if (!taskModified.success) {
        throw new Error(
          taskModified.message ||
            "Non è stato possibile modificare la task selezionata!"
        );
      } else {
        dispatch({ type: "UPDATE_TASK", payload: { id, taskModified } });

        return {
          success: taskModified.success,
          message: "ta con successo!",
          task: taskModified.task,
        };
      }
    } catch (err) {
      /* console.error(err.message); */
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const removeMultipleTasks = async (idList) => {
    try {
      let promises = idList.map((id) =>
        fetch(`${apiUrl}/tasks/${id}`, { method: "DELETE" }).then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP Error ${res.status} - ${res.statusText}`);
          }
        })
      );
      const result = await Promise.allSettled(promises);

      const idFulfilled = idList.filter(
        (id, i) => result[i].status === "fulfilled"
      );

      const idRejected = idList.filter(
        (id, i) => result[i].status === "rejected"
      );

      dispatch({ type: "REMOVE_MULTIPLE_TASKS", payload: idFulfilled });

      alert(
        `Risultato eliminazione tasks:\n\n` +
          (idFulfilled.length > 0
            ? `✅ Tasks eliminate con successo: ${idFulfilled
                .sort((a, b) => a - b)
                .join(", ")}\n`
            : "⚠️ Nessuna task eliminata con successo.\n") +
          (idRejected.length > 0
            ? `❌ Tasks non eliminate: ${idRejected
                .sort((a, b) => a - b)
                .join(", ")}`
            : "🎉 Tutte le tasks sono state eliminate con successo!")
      );
    } catch (err) {
      console.log("Messaggio di errore", err.message);
    }
  };

  return {
    taskList,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
  };
};

export default useTasks;
