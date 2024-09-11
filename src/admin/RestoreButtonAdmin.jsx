import { FaTrashRestore } from "react-icons/fa";

function RestoreButtonAdmin({ action }) {
  return (
    <button onClick={action} id="restore--btn" className="restore--btn">
      <FaTrashRestore />
    </button>
  );
}

export default RestoreButtonAdmin;
