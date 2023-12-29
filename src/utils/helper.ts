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