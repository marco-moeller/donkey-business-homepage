import { IoMdCheckmark } from "react-icons/io";

function ConfirmButtonAdmin({ action }) {
  return (
    <button onClick={action} className="confirm--btn admin">
      <IoMdCheckmark />
    </button>
  );
}

export default ConfirmButtonAdmin;
