import { MdDeleteForever } from "react-icons/md";
import { deleteStreamFromDatabase } from "../database/databaseOperations";

function DeleteStreamButtonAdmin({ iD }) {
  const handleClick = async () => {
    await deleteStreamFromDatabase(iD);
  };

  return (
    <button onClick={handleClick} className="delete--stream--btn admin">
      <MdDeleteForever />
    </button>
  );
}

export default DeleteStreamButtonAdmin;
