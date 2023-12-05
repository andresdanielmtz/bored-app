import { useState, useEffect } from "react";

export default function CommunicationButton() {
  const [based, setBased] = useState<boolean>(false);

  /**
   * This is the code that will be executed when the button is clicked.
   * It will send a POST request to the backend server.
   */

  useEffect(() => {
    fetch("http://localhost:8000/method", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ based }),
    });
  }, [based]);

  return (
    <>
      <button
        id="based-button"
        onClick={() => {
          setBased(!based);
        }}
      >
        Communication Button {based ? "True" : "False"}!
      </button>
    </>
  );
}
