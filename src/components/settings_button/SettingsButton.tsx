import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SettingsButton() {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <Link to="/settings">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          <AiFillSetting />
        </button>
      </Link>
    </div>
  );
}
