/**
 * Converts form data into an object
 *
 * @param {FormData} data The form data we want to make JSON
 * @returns An object of the data
 */
function ParseFormData(data) {
  // Initialize an item object
  let items = {};

  // Iterate over the data and append it to items
  data.forEach((val, key) => {
    items[key] = val;
  });

  // Return items
  return items;
}

function getMonthStr(month) {
  if (month === 0) return 'Jan';
  else if (month === 1) return 'Feb';
  else if (month === 2) return 'Mar';
  else if (month === 3) return 'Apr';
  else if (month === 4) return 'May';
  else if (month === 5) return 'Jun';
  else if (month === 6) return 'Jul';
  else if (month === 7) return 'Aug';
  else if (month === 8) return 'Sep';
  else if (month === 9) return 'Oct';
  else if (month === 10) return 'Nov';
  else if (month === 11) return 'Dec';
}

function appendZeroToTime(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

function createDateString(time) {
  const month = getMonthStr(time.getMonth());
  const date = time.getDate();
  const year = time.getFullYear();
  return `${month} ${date}, ${year}`;
}

function createTimeString(time) {
  const hours = appendZeroToTime(time.getHours());
  const mins = appendZeroToTime(time.getMinutes());
  return `${hours}:${mins}`;
}

function createBirthString(time) {
  const date = appendZeroToTime(time.getDate());
  const month = appendZeroToTime(time.getMonth() + 1);
  const year = time.getFullYear();
  return `${date}/${month}/${year}`;
}

export {
  ParseFormData,
  createDateString,
  createTimeString,
  createBirthString,
};
