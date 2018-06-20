const chai = require("chai");
const { calcPercentOverdue, calcRecallRate } = require("../src/index");
const {
  today,
  oneDayAgo,
  oneWeekAgo,
  twoDaysInFuture,
  twoWeeksInFuture,
} = require("./utils/constants");

const expect = chai.expect;

const testData = [
  {
    reviewedAt: oneWeekAgo,
    interval: 7,
    percentOverdue: 1,
    recallRate: 0.5,
  },
  {
    reviewedAt: oneWeekAgo,
    interval: 14,
    percentOverdue: 0.5,
    recallRate: 0.71,
  },
  {
    reviewedAt: oneWeekAgo,
    interval: 1,
    percentOverdue: 2,
    recallRate: 0.01,
  },
  {
    reviewedAt: oneDayAgo,
    interval: 1,
    percentOverdue: 1,
    recallRate: 0.5,
  },
  {
    reviewedAt: oneDayAgo,
    interval: 4,
    percentOverdue: 0.25,
    recallRate: 0.85,
  },
  {
    reviewedAt: today,
    interval: 4,
    percentOverdue: 0,
    recallRate: 1,
  },
];

describe("calcRecallRate", () => {
  testData.forEach(({ reviewedAt, interval, recallRate }, i) => {
    it(`it should return recall rate - ${i}`, () => {
      const result = calcRecallRate(reviewedAt, interval);
      expect(result).to.equal(recallRate);
    });
  });
});
describe("calcPercentOverdue", () => {
  it("should return the percent overdue for an item reviewed in the past", () => {
    testData.forEach(({ reviewedAt, interval, percentOverdue }) => {
      const result = calcPercentOverdue(reviewedAt, interval);
      expect(result).to.equal(percentOverdue);
    });
  });
  it("should return a maximum value of 2", () => {
    const result = calcPercentOverdue(oneWeekAgo, 1);
    expect(result).to.equal(2);
  });
});
describe("calculate", () => {});
