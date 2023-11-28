import React, { useState } from "react";

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
