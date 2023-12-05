import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import SettingsButton from "../../components/settings_button/SettingsButton.tsx";
import Bored_Footer from "../../components/footer/footer.tsx";
import Bored_Title from "../../components/title/title.tsx";

export default function Main() {
  const [tasks, setTasks] = useState<string[]>([]); // Array of strings
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault(); // Prevent the default behavior of the button
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([newTask, ...tasks]);
    setNewTask(""); // Clear the newTask value after submitting
    setShowForm(false);
    
  };

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

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      console.log("storedTasks", storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("tasks", tasks);
  }, [tasks]);

  return (
    <>
      <div>
        <Bored_Title />

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
            <div className="flex flex-row">
              <p>{task}</p>
            </div>
          </div>
        ))}
      </div>
      <Bored_Footer />
      <SettingsButton />
    </>
  );
}
