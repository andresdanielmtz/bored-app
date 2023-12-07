import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import SettingsButton from "../../components/settings_button/SettingsButton.tsx";
import Bored_Footer from "../../components/footer/footer.tsx";
import Bored_Title from "../../components/title/title.tsx";
import CommunicationButton from "../../components/communication_backend/communication_button.tsx";

export default function Main() {
  const [tasks, setTasks] = React.useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault(); // Prevent the default behavior of the button
    setShowForm(true);
  };

  /**
   * Handles the form submission.
   *
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([newTask, ...tasks]);

    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newTask }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

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
    fetch("http://localhost:8000/tasksDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: tasks[index] }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data): void => {
        const newTasks: string[] = data.map((task: any) => task.message);
        setTasks(newTasks);
      });
  }, []);

  return (
    <>
      <div>
        <CommunicationButton />
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
