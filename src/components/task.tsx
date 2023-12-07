import React from "react";

/**
 * This is the Task component. It is still and development and has not been used.
 */
interface TaskProps {
  task: string;
  index: number;
  deleteTask: (index: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, deleteTask }) => {
  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <div>
      <span>{task}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
