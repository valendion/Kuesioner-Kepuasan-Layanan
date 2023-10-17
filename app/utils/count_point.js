import { questionData } from "./contans";

export const totalPoint = (selectedAnswers) => {
  let totalPoints = 0;
  const answers = [...selectedAnswers];
  answers.forEach((answer, index) => {
    const question = questionData[index];
    const selectedChoice = question.choice.find(
      (choice) => choice.answer === answer
    );

    if (selectedChoice) {
      totalPoints += selectedChoice.point;
    }
  });
  return totalPoints;
};
