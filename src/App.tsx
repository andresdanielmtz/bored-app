import "./App.css";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault(); // Prevent the default behavior of the button
    setShowForm(true);
  };
  console.log("Hello World");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([newTask, ...tasks]);
    setNewTask(""); // Clear the newTask value after submitting
    setShowForm(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent | KeyboardEvent) => {
    if ((e as React.KeyboardEvent).key === "Enter" && showForm) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    } else if (
      (e as KeyboardEvent).key === "a" ||
      (e as KeyboardEvent).key === "A"
    ) {
      if (!showForm) {
        addTask(e as React.KeyboardEvent);
        setNewTask(""); // Clear the newTask value after submitting
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  

  /**
   * Deletes a task from the tasks array.
   * @param {number} index - The index of the task to be deleted.
   */
  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [showForm]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showForm]);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold"> To Be Bored </h1>
        <h3 className="text-xs font-thin"> Another To-Do App </h3>

        <button className="my-10" onClick={addTask}>
          Add Task
        </button>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {tasks.reverse().map((task, index) => (
          <div
            key={index}
            className="flex flex-row items-center"
            style={{ marginRight: "10px" }}
          >
            <button className="mx-10" onClick={() => deleteTask(index)}>
              x
            </button>
            <p>{task}</p>
          </div>
        ))}
      </div>
      <footer>
        <div id="instructions">
          <h3 className="text-m font-bold"> Instructions </h3>
          <ul className="text-xs">
            <li>
              Press <code> A </code> to add elements.
            </li>
            <li>
              While typing, press <code> Enter </code> to add said task to the
              list.
            </li>
          </ul>
        </div>
        <h2 className="text-xs font-thin">
          {" "}
          Made by{" "}
          <a
            href="https://github.com/andresdanielmtz"
            className="text-blue-500"
          >
            {" "}
            @andresdanielmtz{" "}
          </a>{" "}
        </h2>
      </footer>
    </>
  );
}
