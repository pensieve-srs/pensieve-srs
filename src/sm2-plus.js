/* eslint-disable no-mixed-operators */
const dateUtils = require("./dateUtils");

const GRADE_MIN = 0;
const GRADE_MAX = 1;
const GRADE_CUTOFF = 0.6;
const DEFAULT_DIFFICULTY = 0.3;

const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

const calcRecallRate = (reviewedAt, interval, today) => {
  const diff = dateUtils.diffDays(today, reviewedAt);
  const recall = 2 ** (-diff / interval);
  return Math.ceil(recall * 100) / 100;
};

const calcPercentOverdue = (reviewedAt, interval, today) => {
  const diff = dateUtils.diffDays(today, reviewedAt);
  const calculated = diff / interval;
  return Math.min(2, calculated);
};

const calculate = (reviewedAt, prevDifficulty, prevInterval, performanceRating, today) => {
  const percentOverdue = calcPercentOverdue(reviewedAt, prevInterval, today);

  const difficulty = prevDifficulty + (8 - 9 * performanceRating) * percentOverdue / 17;

  const difficultyWeight = 3 - 1.7 * clamp(difficulty, 0, 1);

  let interval;
  if (performanceRating < GRADE_CUTOFF) {
    interval = Math.round(1 / difficultyWeight ** 2) || 1;
  } else {
    interval = 1 + Math.round((difficultyWeight - 1) * percentOverdue);
  }

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
