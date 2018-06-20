const chai = require("chai");
const dateUtils = require("../src/utils/dateUtils");
const {
  today,
  oneDayAgo,
  oneWeekAgo,
  twoDaysInFuture,
  twoWeeksInFuture,
} = require("./utils/constants");

expect = chai.expect;
chai.use(require("chai-datetime"));

describe("dateUtils", () => {
  describe("diffDays", () => {
    it("it should return the difference of two dates", () => {
      expect(dateUtils.diffDays(today, oneDayAgo)).to.equal(1);
      expect(dateUtils.diffDays(today, oneWeekAgo)).to.equal(7);
      expect(dateUtils.diffDays(today, twoDaysInFuture)).to.equal(-2);
      expect(dateUtils.diffDays(today, twoWeeksInFuture)).to.equal(-14);
    });
  });

  describe("addDays", () => {
    it("it should add a given number of days to a date", () => {
      expect(dateUtils.addDays(today, 2)).to.equalDate(twoDaysInFuture);
      expect(dateUtils.addDays(today, 14)).to.equalDate(twoWeeksInFuture);
    });
  });
});
