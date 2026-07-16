
export interface PasswordConfig {
  lowercase: number;
  uppercase: number;
  numbers: number;
  special: number;
}

export type CharType = keyof PasswordConfig;

export const ALL_SPECIAL_CHARS = [
  '!', '?', '&', '%', '$', '§', '(', ')', '[', ']', '<', '>',
  '@', '|', ';', '.', ',', '_', '+', '-', '*', '/', '~', '='
];
