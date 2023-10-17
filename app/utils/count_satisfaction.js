export const countSatisfaction = (number) => {
  const numberSatisfaction = number / 9;

  console.log("numberSatisfaction", numberSatisfaction);
  if (numberSatisfaction >= 1 && numberSatisfaction <= 1.9) {
    return "Tidak puas";
  } else if (numberSatisfaction >= 2 && numberSatisfaction <= 2.9) {
    return "Kurang puas";
  } else if (numberSatisfaction >= 3 && numberSatisfaction <= 3.9) {
    return "Puas";
  } else {
    return "Sangat Puas";
  }
};
