import { addMatchToDatabase } from "../database/databaseOperations";
import { convertToTime } from "../utility/dateFunctions";
import ConfirmButtonAdmin from "./ConfirmButtonAdmin";
import CancelButtonAdmin from "./CancelButtonAdmin";
import DeleteMatchButtonAdmin from "./DeleteMatchButtonAdmin";
import useUpcomingMatchForm from "../hooks/useUpcomingMatchForm";
import CalendarWithInput from "../components/CalendarWithInput";

function EditUpcomingMatchAdmin({ match, toggle }) {
  const {
    data,
    error,
    setError,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleTimeBlur
  } = useUpcomingMatchForm({ ...match });

  const submit = () => {
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

      addMatchToDatabase({ ...data });
      setError("");
      toggle();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
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
          placeholder="Score Team 1"
          name="score1"
          value={data.score1}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Score Team 2"
          name="score2"
          value={data.score2}
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
          placeholder="Stream Link"
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

        <label>
          <input
            type="radio"
            name="status"
            value="upcoming"
            checked={data.status === "upcoming"}
            onChange={handleChange}
          />
          Upcoming
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="live"
            checked={data.status === "live"}
            onChange={handleChange}
          />
          Live
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="past"
            checked={data.status === "past"}
            onChange={handleChange}
          />
          Past
        </label>

        <p className="error">
          {error === "" && <span className="transparent">no error</span>}
          {error?.message}{" "}
        </p>
      </div>
      <div className="admin--btns">
        <ConfirmButtonAdmin action={submit} />
        <CancelButtonAdmin action={toggle} />
        <DeleteMatchButtonAdmin match={match} />{" "}
      </div>
    </>
  );
}

export default EditUpcomingMatchAdmin;
