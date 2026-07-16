
import { PasswordConfig } from '../types';

const CHAR_MAP = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
};

export const generatePassword = (
  config: PasswordConfig,
  allowedSpecial: string[]
): string => {
  let resultArr: string[] = [];

  // Add lowercase
  for (let i = 0; i < config.lowercase; i++) {
    resultArr.push(CHAR_MAP.lowercase.charAt(Math.floor(Math.random() * CHAR_MAP.lowercase.length)));
  }

  // Add uppercase
  for (let i = 0; i < config.uppercase; i++) {
    resultArr.push(CHAR_MAP.uppercase.charAt(Math.floor(Math.random() * CHAR_MAP.uppercase.length)));
  }

  // Add numbers
  for (let i = 0; i < config.numbers; i++) {
    resultArr.push(CHAR_MAP.numbers.charAt(Math.floor(Math.random() * CHAR_MAP.numbers.length)));
  }

  // Add special characters from the enabled set
  if (allowedSpecial.length > 0) {
    for (let i = 0; i < config.special; i++) {
      resultArr.push(allowedSpecial[Math.floor(Math.random() * allowedSpecial.length)]);
    }
  } else if (config.special > 0) {
    // Fallback if special count > 0 but no chars selected? 
    // Usually UI should prevent this or we just skip.
  }

  // Fisher-Yates Shuffle
  for (let i = resultArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultArr[i], resultArr[j]] = [resultArr[j], resultArr[i]];
  }

  return resultArr.join('');
};
