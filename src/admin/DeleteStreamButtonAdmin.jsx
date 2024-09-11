import { MdDeleteForever } from "react-icons/md";
import {
  addStreamArchiveToDatabase,
  deleteStreamFromDatabase
} from "../database/databaseOperations";

function DeleteStreamButtonAdmin({ stream }) {
  const handleClick = async () => {
    await deleteStreamFromDatabase(stream.id);
    await addStreamArchiveToDatabase(stream);
  };

  return (
    <button onClick={handleClick} className="delete--stream--btn admin">
      <MdDeleteForever />
    </button>
  );
}

export default DeleteStreamButtonAdmin;
