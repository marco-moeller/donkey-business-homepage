import { addMatchToDatabase } from "../database/databaseOperations";
import { nanoid } from "nanoid";
import { convertToTime } from "../utility/dateFunctions";
import { FaSquarePlus } from "react-icons/fa6";
import useUpcomingMatchForm from "../hooks/useUpcomingMatchForm";
import CalendarWithInput from "../components/CalendarWithInput";

const EMPTY_MATCH = {
  date: "", // month, day year
  time: "", // time 24h
  link: "", //optional
  team1: "",
  team2: "",
  type: "clanwar", // clanwar or individual match - no usage yet
  score1: 0,
  score2: 0,
  status: "upcoming", // upcoming, live, past
  stream: "" // optional
};

function AddUpcomingMatchAdmin() {
  const {
    data,
    setData,
    error,
    setError,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleTimeBlur
  } = useUpcomingMatchForm({ ...EMPTY_MATCH });

  const submit = () => {
    console.log(data);

    try {
      if (data.team1 === "") {
        throw new Error("Team 1 can't be empty");
      }
      if (data.team2 === "") {
        throw new Error("Team 2 can't be empty");
      }

      if (data.date === "") {
        throw new Error("Please provide a match Date");
      }
      if (data.time === "") {
        throw new Error("Please provide a match Time");
      }

      addMatchToDatabase({
        ...data,
        id: nanoid(),
        stream: "https://www.twitch.tv/" + data.stream
      });
      setError("");
      setData({ ...EMPTY_MATCH });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h4 className="admin">Add Upcoming Match</h4>
      <div className="admin--add--match admin">
        <input
          type="text"
          placeholder="Team1"
          name="team1"
          value={data.team1}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Team2"
          name="team2"
          value={data.team2}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Match Link"
          name="link"
          value={data.link}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Twitch Channel"
          name="stream"
          value={data.stream}
          onChange={handleChange}
        />

        <CalendarWithInput
          handleDateChange={handleDateChange}
          value={data.date}
        />
        <input
          type="text"
          name="time"
          placeholder={convertToTime(new Date())}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
          value={data.time}
        />
        <button onClick={submit}>
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

export default AddUpcomingMatchAdmin;
