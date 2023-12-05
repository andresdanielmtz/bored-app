import { useState, useEffect } from "react";

export default function CommunicationButton() {
  const [based, setBased] = useState<boolean>(false);

  /**
   * This is the code that will be executed when the button is clicked.
   * It will send a GET request to the backend server.S
   */

  useEffect(() => {
    fetch("http://localhost:8000/method")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
