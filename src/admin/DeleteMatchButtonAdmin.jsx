import { MdDeleteForever } from "react-icons/md";
import { deleteMatchFromDatabase } from "../database/databaseOperations";

function DeleteMatchButtonAdmin({ iD }) {
  const handleClick = async () => {
    await deleteMatchFromDatabase(iD);
  };

  return (
    <button onClick={handleClick} className="delete--stream--btn admin">
      <MdDeleteForever />
    </button>
  );
}

export default DeleteMatchButtonAdmin;
