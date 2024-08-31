const dateOptions = {
  day: "numeric",
  month: "short"
};

const monthYearOptions = {
  month: "long",
  year: "numeric"
};

const monthDayTimeOption = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: false
};

const monthDayYearOption = {
  month: "long",
  day: "numeric",
  year: "numeric"
};

const monthDayOption = {
  month: "long",
  day: "numeric"
};

const timeOption = {
  hour: "numeric",
  minute: "2-digit",
  hour12: false
};

export const convertToLocaleDate = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleDateString(undefined, dateOptions);
  }

  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleDateString(undefined, dateOptions);
  } else {
    return new Date(date).toLocaleDateString(undefined, dateOptions);
  }
};

export const convertToMonthYear = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleDateString(
      undefined,
      monthYearOptions
    );
  }
  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleDateString(undefined, monthYearOptions);
  } else {
    return new Date(date).toLocaleDateString(undefined, monthYearOptions);
  }
};

export const convertToMonthDayTime = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleDateString(
      undefined,
      monthDayTimeOption
    );
  }
  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleDateString(undefined, monthDayTimeOption);
  } else {
    return new Date(date).toLocaleDateString(undefined, monthDayTimeOption);
  }
};

export const convertToMonthDayYear = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleDateString(
      undefined,
      monthDayYearOption
    );
  }
  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleDateString(undefined, monthDayYearOption);
  } else {
    return new Date(date).toLocaleDateString(undefined, monthDayYearOption);
  }
};

export const convertToMonthDay = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleDateString(
      undefined,
      monthDayOption
    );
  }
  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleDateString(undefined, monthDayOption);
  } else {
    return new Date(date).toLocaleDateString(undefined, monthDayOption);
  }
};

export const convertToTime = (date) => {
  if (date.nanoseconds === 0) {
    return new Date(date.toDate()).toLocaleTimeString(undefined, timeOption);
  }
  if (typeof date === "string") {
    return new Date(
      date.toString().replace(/-/g, "/").replace(/T.+/, "")
    ).toLocaleTimeString(undefined, timeOption);
  } else {
    return new Date(date).toLocaleTimeString(undefined, timeOption);
  }
};
