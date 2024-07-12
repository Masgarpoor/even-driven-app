import jalaali from "jalaali-js";
import moment from "moment-timezone";

export function convertDateToUTC(data) {
  const [jalaaliDate, time] = data.split("T");
  const [year, month, day] = jalaaliDate.split("-").map(Number);
  const gregorianDate = jalaali.toGregorian(year, month, day);

  // Combining Gregorian date with time
  const gregorianDateTime = `${gregorianDate.gy}-${String(
    gregorianDate.gm
  ).padStart(2, "0")}-${String(gregorianDate.gd).padStart(2, "0")}T${time}`; // 2024-07-12T01:30:00

  const tehranTime = moment.tz(gregorianDateTime, "Asia/Tehran"); // Moment<2024-07-12T01:30:00+03:30>

  const utcTime = tehranTime.utc().format(); // 2024-07-11T22:00:00Z

  return utcTime;
}

export function convertDateToTimestamp(date) {
  return new Date(date).getTime();
}
