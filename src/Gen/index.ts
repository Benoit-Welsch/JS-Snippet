import { famousName, word } from './list';

/**
 * Generate a random name 
 * @param serperator - The separator between the two words
 * @param capitalize - Capitalize the first letter of each word
 * @returns A string
*/
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

/**
 * Generate pseudo random numbers between min and max
 * @param min - The minimum number
 * @param max - The maximum number
 * @returns A number
*/
export const randomNumbers = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}