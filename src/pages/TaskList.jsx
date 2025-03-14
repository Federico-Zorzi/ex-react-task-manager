import { useTaskContext } from "../context/taskContext";
import { useCallback, useMemo, useState } from "react";

import TaskRow from "../components/TaskRow";

const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

export default function TaskList() {
  const { taskList } = useTaskContext();
  /* console.log("taskList", taskList); */

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const tasksOrdered = useMemo(() => {
    /* console.log("Ordino per:", sortBy); */
    let taskListUpdated = taskList && [...taskList];

    if (taskListUpdated) {
      if (searchQuery) {
        taskListUpdated = taskListUpdated.filter((t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      switch (sortBy) {
        case "id":
          if (sortOrder === 1) {
            return taskListUpdated.sort((a, b) => a.id - b.id);
          } else {
            return taskListUpdated.sort((a, b) => b.id - a.id);
          }
        case "title":
          if (sortOrder === 1) {
            return taskListUpdated.sort((a, b) =>
              a.title.trim().localeCompare(b.title.trim())
            );
          } else {
            return taskListUpdated.sort((a, b) =>
              b.title.trim().localeCompare(a.title.trim())
            );
          }
        case "status":
          if (sortOrder === 1) {
            return taskListUpdated.sort((a, b) => {
              const aVal =
                a.status === "To do" ? -1 : a.status === "Doing" ? 0 : 1;
              const bVal =
                b.status === "To do" ? -1 : b.status === "Doing" ? 0 : 1;
              return aVal - bVal;
            });
          } else {
            return taskListUpdated.sort((a, b) => {
              const aVal =
                a.status === "To do" ? -1 : a.status === "Doing" ? 0 : 1;
              const bVal =
                b.status === "To do" ? -1 : b.status === "Doing" ? 0 : 1;
              return bVal - aVal;
            });
          }
        case "createdAt":
          if (sortOrder === 1) {
            return taskListUpdated.sort((a, b) => {
              const date1 = new Date(a.createdAt);
              const date2 = new Date(b.createdAt);
              return date1.getTime() - date2.getTime();
            });
          } else {
            return taskListUpdated.sort((a, b) => {
              const date1 = new Date(a.createdAt);
              const date2 = new Date(b.createdAt);
              return date2.getTime() - date1.getTime();
            });
          }

        default:
          taskListUpdated;
      }
    }
  }, [taskList, sortBy, sortOrder, searchQuery]);

  const handleSort = (sortEl) => {
    setSortBy(sortEl);
    sortBy === sortEl
      ? setSortOrder((currVal) => currVal * -1)
      : setSortOrder(1);
  };

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  return (
    <main>
      <div id="main-header">
        <div id="title">
          <h1>Task List</h1>
        </div>
        <div id="searchbar">
          <input
            type="text"
            /* value={searchQuery} */
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cerca una Taks..."
          />
        </div>
      </div>

      {/* TASK LIST TABLE */}
      {taskList && (
        <table>
          <thead>
            <tr>
              <th type="button" onClick={() => handleSort("id")}>
                Id{" "}
                {sortBy === "id" && (
                  <span>
                    <i
                      className={
                        "fa-solid fa-sort-" + (sortOrder === 1 ? "up" : "down")
                      }
                    ></i>
                  </span>
                )}
              </th>
              <th type="button" onClick={() => handleSort("title")}>
                Titolo{" "}
                {sortBy === "title" && (
                  <span>
                    <i
                      className={
                        "fa-solid fa-sort-" + (sortOrder === 1 ? "up" : "down")
                      }
                    ></i>
                  </span>
                )}
              </th>
              <th type="button" onClick={() => handleSort("status")}>
                Stato{" "}
                {sortBy === "status" && (
                  <span>
                    <i
                      className={
                        "fa-solid fa-sort-" + (sortOrder === 1 ? "up" : "down")
                      }
                    ></i>
                  </span>
                )}
              </th>
              <th type="button" onClick={() => handleSort("createdAt")}>
                Data di creazione{" "}
                {sortBy === "createdAt" && (
                  <span>
                    <i
                      className={
                        "fa-solid fa-sort-" + (sortOrder === 1 ? "up" : "down")
                      }
                    ></i>
                  </span>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {tasksOrdered.map((t, i) => (
              <TaskRow key={i} {...t} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
