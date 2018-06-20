const today = new Date();
const oneDayAgo = new Date(today);
oneDayAgo.setDate(oneDayAgo.getDate() - 1);
const oneWeekAgo = new Date(today);
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const twoDaysInFuture = new Date(today);
twoDaysInFuture.setDate(twoDaysInFuture.getDate() + 2);
const twoWeeksInFuture = new Date(today);
twoWeeksInFuture.setDate(twoWeeksInFuture.getDate() + 2 * 7);

module.exports = {
  today,
  oneDayAgo,
  oneWeekAgo,
  twoDaysInFuture,
  twoWeeksInFuture,
};
