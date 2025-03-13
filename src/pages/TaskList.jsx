import { useTaskContext } from "../context/taskContext";

import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { taskList } = useTaskContext();
  /* console.log("taskList", taskList); */

  return (
    <main>
      <h1>Task List</h1>

      {/* TASK LIST TABLE */}
      {taskList && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Titolo</th>
              <th>Stato</th>
              <th>Data di creazione</th>
            </tr>
          </thead>

          <tbody>
            {taskList.map((t, i) => (
              <TaskRow key={i} {...t} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
