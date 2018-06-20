const chai = require("chai");
const { calculate, calcPercentOverdue, calcRecallRate } = require("../src/index");
const dateUtils = require("../src/utils/dateUtils");
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

const testDataCalculate = [
  {
    reviewedAt: dateUtils.subtractDays(today, 1),
    performanceRating: 1,
    difficulty: 0.5,
    interval: 1,
    nextDifficulty: 0.44,
    nextInterval: 2,
  },
  {
    reviewedAt: dateUtils.subtractDays(today, 10),
    performanceRating: 1,
    difficulty: 0.5,
    interval: 5,
    nextDifficulty: 0.38,
    nextInterval: 20,
  },
  {
    reviewedAt: dateUtils.subtractDays(today, 18),
    performanceRating: 0,
    difficulty: 0.3,
    interval: 14,
    nextDifficulty: 0.91,
    nextInterval: 14,
  },
  {
    reviewedAt: dateUtils.subtractDays(today, 200),
    performanceRating: 1,
    difficulty: 0.3,
    interval: 100,
    nextDifficulty: 0.18,
    nextInterval: 400,
  },
];

describe("calcRecallRate", () => {
  it("it should return recall rate", () => {
    testData.forEach(({ reviewedAt, interval, recallRate }, i) => {
      const result = calcRecallRate(reviewedAt, interval);
      expect(result).to.equal(recallRate);
    });
  });
});
describe("calcPercentOverdue", () => {
  it("should return the percent overdue for an item reviewed in the past", () => {
    testData.forEach(({ reviewedAt, interval, percentOverdue }) => {
      const actual = calcPercentOverdue(reviewedAt, interval);
      expect(actual).to.equal(percentOverdue);
    });
  });
  it("should return a maximum value of 2", () => {
    const actual = calcPercentOverdue(oneWeekAgo, 1);
    expect(actual).to.equal(2);
  });
});
describe("calculate", () => {
  it("should calculate the next review data", () => {
    testDataCalculate.forEach(data => {
      const { reviewedAt, difficulty, interval, performanceRating } = data;
      const result = calculate(reviewedAt, difficulty, interval, performanceRating, today);
      expect(result.reviewedAt).to.equal(today);
      expect(result.interval).to.equal(data.nextInterval);
      expect(result.difficulty.toFixed(2)).to.equal(data.nextDifficulty.toString());
    });
  });
});
