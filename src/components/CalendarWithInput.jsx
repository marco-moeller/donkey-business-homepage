import { useState } from "react";
import { convertToMonthDayYear } from "../utility/dateFunctions";
import Calendar from "react-calendar";

function CalendarWithInput({ handleDateChange, value }) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <input
        onClick={() => setShowCalendar(true)}
        onFocus={() => setShowCalendar(true)}
        type="text"
        name="date"
        placeholder={convertToMonthDayYear(new Date())}
        value={value}
        readOnly
      />
      {showCalendar && (
        <>
          <div
            className="calendar-wrapper"
            onClick={() => setShowCalendar(false)}
          ></div>
          <Calendar
            onChange={(event) => {
              handleDateChange(event), setShowCalendar(false);
            }}
            value={value}
          />
        </>
      )}{" "}
    </>
  );
}

export default CalendarWithInput;
