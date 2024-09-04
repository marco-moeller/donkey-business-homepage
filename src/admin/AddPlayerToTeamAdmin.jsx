import { FaSquarePlus } from "react-icons/fa6";
import useHandleFormData from "../hooks/useHandleFormData";
import { useState } from "react";
import { addPlayerToDatabase } from "../database/databaseOperations";
import { nanoid } from "nanoid";

const EMPTY_PLAYER = {
  name: "",
  realName: "",
  race: ""
};

function AddPlayerToTeamAdmin() {
  const { data, setData, handleChange } = useHandleFormData({
    ...EMPTY_PLAYER
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      if (data.name === "") {
        throw new Error("Name can't be empty");
      }
      if (data.race === "") {
        throw new Error("Race can't be empty");
      }
      addPlayerToDatabase({ ...data, id: nanoid() });
      setData({ ...EMPTY_PLAYER });
      setError("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h4 className="admin">Add Player To Team</h4>
      <div className="admin--add--player--to--team admin">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <select name="race" value={data.race} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="human">Human</option>
          <option value="undead">Undead</option>
          <option value="nightelf">Nightelf</option>
          <option value="orc">Orc</option>
          <option value="random">Random</option>
        </select>

        <input
          type="text"
          placeholder="Real Name"
          name="realName"
          value={data.realName}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {" "}
          <FaSquarePlus />
        </button>

        <p className="error">
          {error === "" && <span className="transparent">no error</span>}
          {error?.message}{" "}
        </p>
      </div>
    </>
  );
}

export default AddPlayerToTeamAdmin;
