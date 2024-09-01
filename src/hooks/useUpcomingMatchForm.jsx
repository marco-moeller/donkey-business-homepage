import { useState } from "react";
import { convertToMonthDayYear } from "../utility/dateFunctions";

function useUpcomingMatchForm({ match }) {
  const [data, setData] = useState({ ...match });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setData((prevState) => ({
      ...prevState,
      date: convertToMonthDayYear(date)
    }));
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

  return {
    data,
    setData,
    error,
    setError,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleTimeBlur
  };
}

export default useUpcomingMatchForm;
