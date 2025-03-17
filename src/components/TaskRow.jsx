import { memo } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../context/taskContext";

const TaskRow = memo(({ index, checked, onToggle, toggleSelection, ...t }) => {
  const { formatStatusDesign, formatDate } = useTaskContext();

  return (
    <tr>
      <td className="task-id-table">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            onToggle(index);
            toggleSelection(t.id);
          }}
        />
      </td>
      <td className="task-id-table">{t.id}</td>
      <td>
        <Link to={`/task/${t.id}`}>{t.title}</Link>
      </td>
      <td className="task-status-table">{formatStatusDesign(t.status)}</td>
      <td>{formatDate(t.createdAt)}</td>
    </tr>
  );
});

export default TaskRow;
