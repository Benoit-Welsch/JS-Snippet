import { famousName, word } from './list';

export const randomName = (serperator = '-', capitalize = false) => {
  let randomFamousName =
    famousName[Math.floor(Math.random() * famousName.length)];
  let randomWord = word[Math.floor(Math.random() * word.length)];

  if (capitalize) {
    const capitalizeString = (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
    randomFamousName = capitalizeString(randomFamousName);
    randomWord = capitalizeString(randomWord);
  }
  return `${randomFamousName}${serperator}${randomWord}`;
};
