const milliPerDay = 1000 * 60 * 60 * 24;

const addDays = (dateA, numDays) => {
  const date = new Date(dateA);
  date.setDate(date.getDate() + numDays);
  return date;
};

const diffDays = (dateA, dateB) => {
  const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

  return Math.floor((utc2 - utc1) / milliPerDay);
};

module.exports = {
  addDays,
  diffDays,
};
