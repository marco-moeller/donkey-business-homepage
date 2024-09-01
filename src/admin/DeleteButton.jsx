import { MdDeleteForever } from "react-icons/md";

function DeleteButton({ action }) {
  return (
    <button onClick={action} className="delete--stream--btn admin">
      <MdDeleteForever />
    </button>
  );
}

export default DeleteButton;
