export const calculateWPM = (
  startTime: number,
  endTime: number,
  textLength: number
) => {
  const timeElapsed = (endTime - startTime) / 1000 / 60;
  const wordsTyped = textLength / 5;
  return Math.round(wordsTyped / timeElapsed);
};
