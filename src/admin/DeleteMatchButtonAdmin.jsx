import { MdDeleteForever } from "react-icons/md";
import {
  addMatchArchiveToDatabase,
  deleteMatchFromDatabase
} from "../database/databaseOperations";

function DeleteMatchButtonAdmin({ match }) {
  const handleClick = async () => {
    await deleteMatchFromDatabase(match.id);
    await addMatchArchiveToDatabase(match);
  };

  return (
    <button onClick={handleClick} className="delete--stream--btn admin">
      <MdDeleteForever />
    </button>
  );
}

export default DeleteMatchButtonAdmin;
