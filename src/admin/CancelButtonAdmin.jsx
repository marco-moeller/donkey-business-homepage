import { MdCancel } from "react-icons/md";

function CancelButtonAdmin({ action }) {
  return (
    <button onClick={action} className="cancel--btn admin">
      <MdCancel />
    </button>
  );
}

export default CancelButtonAdmin;
