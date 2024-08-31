import { FiEdit } from "react-icons/fi";

function EditButtonAdmin({ action }) {
  return (
    <button onClick={action} className="edit--btn admin">
      <FiEdit />
    </button>
  );
}

export default EditButtonAdmin;
