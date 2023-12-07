export default function Bored_Footer() {
  /**
   * This footer includes the instructions and the link to my GitHub profile.
   */

  return (
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
          <li>
            Press <code> D </code> to delete the latest task.
          </li>
        </ul>
      </div>
      <h2 className="text-xs font-thin">
        {" "}
        Made by{" "}
        <a
          href="https://github.com/andresdanielmtz"
          className="text-blue-500"
          target="_blank"
        >
          {" "}
          @andresdanielmtz{" "}
        </a>{" "}
      </h2>
    </footer>
  );
}
