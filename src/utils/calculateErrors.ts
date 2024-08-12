export const calculateErrors = (input: string, text: string) => {
  return input.split('').reduce((acc, char, index) => {
    return acc + (char !== text[index] ? 1 : 0);
  }, 0);
};
