import { useState } from "react";
import Calendar from "react-calendar";
import { addMatchToDatabase } from "../database/databaseOperations";
import { nanoid } from "nanoid";
import { convertToMonthDayYear } from "../utility/dateFunctions";
import { convertToTime } from "../utility/dateFunctions";
import { FaSquarePlus } from "react-icons/fa6";

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
  const [data, setData] = useState({ ...EMPTY_MATCH });
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setData((prevState) => ({
      ...prevState,
      date: convertToMonthDayYear(date)
    }));
    setShowCalendar((prevState) => !prevState);
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;
    let input = value.replace(/\D/g, "");

    if (input.length >= 2) {
      let hours = input.slice(0, 2); // Extract hours part
      let minutes = input.slice(2, 4); // Extract minutes part

      // Ensure hours are within 00-23
      if (parseInt(hours, 10) > 23) {
        hours = "";
      }

      // Ensure minutes are within 00-59
      if (parseInt(minutes, 10) > 59) {
        minutes = "";
      }
      if (hours !== "") {
        input = hours + ":" + minutes; // Combine hours and minutes with colon}
      } else {
        input = "";
      }
      if (minutes === "") {
        input = hours;
      }
    } else if (input.length >= 1) {
      input = input.slice(0, 2); // If only 1 or 2 digits, allow them as they are part of the hour
    }

    setData((prevState) => ({ ...prevState, time: input }));
  };

  const handleTimeBlur = (event) => {
    const { value } = event.target;

    let input = value.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length === 0) return; // If input is empty, do nothing

    let hours = input.slice(0, 2).padStart(2, "0"); // Ensure hours have at least 2 digits
    let minutes = input.slice(2, 4).padEnd(2, "0"); // Ensure minutes have at least 2 digits

    // Set formatted value back to the input field
    input = `${hours}:${minutes}`;

    setData((prevState) => ({ ...prevState, time: input }));
  };

  const submit = () => {
    try {
      if (data.team1 === "") {
        throw new Error("Team 1 can't be empty");
      }
      if (data.team2 === "") {
        throw new Error("Team 2 can't be empty");
      }

      // if (data.link === "") {
      //   throw new Error("Please provide a match link");
      // }
      if (data.date === "") {
        throw new Error("Please provide a match Date");
      }
      if (data.time === "") {
        throw new Error("Please provide a match Time");
      }

      addMatchToDatabase({ ...data, id: nanoid() });
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
          placeholder="Stream Link"
          name="stream"
          value={data.stream}
          onChange={handleChange}
        />

        <input
          onClick={() => setShowCalendar(true)}
          onFocus={() => setShowCalendar(true)}
          type="text"
          name="date"
          placeholder={convertToMonthDayYear(new Date())}
          value={data.date}
          readOnly
        />
        {showCalendar && (
          <>
            <div
              className="calendar-wrapper"
              onClick={() => setShowCalendar(false)}
            ></div>
            <Calendar onChange={handleDateChange} value={data.date} />
          </>
        )}
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
