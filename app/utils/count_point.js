import { questionData } from "./contans";

export const totalPoint = (selectedAnswers) => {
  let totalPoints = 0;
  const answers = [...selectedAnswers];
  answers.forEach((answer, index) => {
    // const question = questionData[index];
    // const selectedChoice = question.choice.find(
    //   (choice) => choice.answer === answer
    // );

    // if (selectedChoice) {
    totalPoints += answer;
    // }
  });
  return totalPoints;
};

export const respondentAssessment = (polis) => {
  const tidakPuas = polis.filter(
    (item) =>
      totalPoint(item.answers) / 9 >= 1 && totalPoint(item.answers) / 9 <= 1.9
  ).length;

  const kurangPuas = polis.filter(
    (item) =>
      totalPoint(item.answers) / 9 >= 2 && totalPoint(item.answers) / 9 <= 2.9
  ).length;

  const puas = polis.filter(
    (item) =>
      totalPoint(item.answers) / 9 >= 3 && totalPoint(item.answers) / 9 <= 3.9
  ).length;

  const sangatPuas = polis.filter(
    (item) => totalPoint(item.answers) / 9 === 4
  ).length;
  return [sangatPuas, puas, kurangPuas, tidakPuas];
};

export const changeArrayInt = (selectedAnswers) => {
  const oldAnswers = [...selectedAnswers];
  const newAnswers = [];
  oldAnswers.forEach((answer, index) => {
    const question = questionData[index];
    const selectedChoice = question.choice.find(
      (choice) => choice.answer === answer
    );

    if (selectedChoice) {
      newAnswers.push(selectedChoice.point);
    }
  });
  return newAnswers;
};
