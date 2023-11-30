import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Bored_Footer from "./components/footer/footer.tsx";
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

  /***
   * Handles the keypress event.
   * @param {React.KeyboardEvent<HTMLInputElement> | KeyboardEvent} e - The event object.
   * @returns {void}
   * @description
   * If the user presses the Enter key while the form is visible, the form is submitted.
   * If the user presses the Escape key while the form is visible, the form is hidden.
   * If the user presses the A key while the form is hidden, the form is shown.
   * If the user presses the D key while the form is hidden, the latest task is deleted.
   */

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    const isEnterKey = (key: string) => key === "Enter";
    const isEscapeKey = (key: string) => key === "Escape";
    const isAddKey = (key: string) => key === "a" || key === "A";
    const isDeleteKey = (key: string) => key === "d" || key === "D";

    const { key } = e as KeyboardEvent;

    if (isEnterKey(key) && showForm) {
      e.preventDefault();
      handleSubmit(e as any);
    } else if (!showForm) {
      if (isAddKey(key)) {
        setShowForm(true);
        addTask(e as any);
        setNewTask("");
      } else if (isEscapeKey(key)) {
        setShowForm(false);
      } else if (isDeleteKey(key)) {
        deleteTask(tasks.length - 1);
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
      <Bored_Footer />
    </>
  );
}
