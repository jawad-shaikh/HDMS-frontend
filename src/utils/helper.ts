export const convertDate = (originalDate: string): string => {
  const date = new Date(originalDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const year = date.getFullYear();

  // Ensure that single-digit day and month are padded with a leading zero
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  return `${formattedMonth}/${formattedDay}/${year}`;
};

export function formatTime(originalDate: string) {
  const date = new Date(originalDate);

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function calculateDateDifferenceInDays(date1String: string, date2String: string) {
  // Parse the dates into Date objects
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  // Get the difference in milliseconds
  const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  // Convert the difference to days
  const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

  return Math.round(differenceInDays);
}