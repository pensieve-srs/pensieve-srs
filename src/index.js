/* eslint-disable no-mixed-operators */
const dateUtils = require("./utils/dateUtils");

const GRADE_MIN = 0;
const GRADE_MAX = 1;
const GRADE_CUTOFF = 0.6;
const DEFAULT_DIFFICULTY = 0.3;

const clamp = (number, min, max) => {
  return Math.min(Math.max(number, min), max);
};

const calcRecallRate = (reviewedAt, interval, today = new Date()) => {
  const diff = dateUtils.diffDays(today, reviewedAt);
  const recall = 2 ** (-diff / interval);
  return Math.ceil(recall * 100) / 100;
};

const calcPercentOverdue = (reviewedAt, interval, today = new Date()) => {
  const diff = dateUtils.diffDays(today, reviewedAt);
  const calculated = diff / interval;
  return Math.min(2, calculated);
};

const calculate = (reviewedAt, prevDifficulty, prevInterval, performanceRating, today) => {
  const percentOverdue = calcPercentOverdue(reviewedAt, prevInterval, today);

  const difficultyDelta = percentOverdue * (1 / 17) * (8 - 9 * performanceRating);
  const difficulty = clamp(prevDifficulty + difficultyDelta, 0, 1);

  const difficultyWeight = 3 - 1.7 * difficulty;

  let intervalDelta;
  if (performanceRating < GRADE_CUTOFF) {
    intervalDelta = Math.round(1 / difficultyWeight ** 2) || 1;
  } else {
    intervalDelta = 1 + Math.round((difficultyWeight - 1) * percentOverdue);
  }

  const interval = prevInterval * intervalDelta;

  const nextReviewDate = dateUtils.addDays(today, interval);

  return {
    difficulty,
    interval,
    nextReviewDate,
    reviewedAt: today,
  };
};

module.exports = {
  calculate,
  calcRecallRate,
  calcPercentOverdue,
  GRADE_MIN,
  GRADE_MAX,
  GRADE_CUTOFF,
  DEFAULT_DIFFICULTY,
};
