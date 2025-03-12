import { memo } from "react";

const TaskRow = memo((t) => {
  const formatStatusDesign = (status) => {
    switch (status) {
      case "To do":
        return <i className="fa-solid fa-x fa-lg"></i>;
      case "Doing":
        return <i className="fa-solid fa-spinner fa-lg"></i>;
      case "Done":
        return <i className="fa-solid fa-check fa-lg"></i>;
      default:
        return <i className="fa-solid fa-x fa-lg"></i>;
    }
  };

  return (
    <tr>
      <td className="task-id-table">{t.id}</td>
      <td>{t.title}</td>
      <td className="task-status-table">{formatStatusDesign(t.status)}</td>
      <td>{t.createdAt}</td>
    </tr>
  );
});

export default TaskRow;
