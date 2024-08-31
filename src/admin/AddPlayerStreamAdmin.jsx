import { useState } from "react";
import { addStreamToDatabase } from "../database/databaseOperations";
import { nanoid } from "nanoid";
import { FaSquarePlus } from "react-icons/fa6";

function AddPlayerStreamAdmin() {
  const [data, setData] = useState({ name: "", url: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submit = () => {
    try {
      if (data.name === "") {
        throw new Error("name can't be empty");
      }
      if (data.url === "") {
        throw new Error("url can't be empty");
      }
      addStreamToDatabase({ ...data, id: nanoid() });
      setError("");
      setData({ name: "", url: "" });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h4 className="admin">Add Player Stream</h4>
      <div className="admin--add--stream admin">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Twitch Name"
          name="url"
          value={data.url}
          onChange={handleChange}
        />
        <button onClick={submit}>
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

export default AddPlayerStreamAdmin;
