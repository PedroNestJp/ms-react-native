export const containsUppercaseLetters = (string) => /[A-Z]/.test(string);
export const containsLowercaseLetters = (string) => /[a-z]/.test(string);
export const containsSpecialCharacters = (string) => /[-!@#$%^&*]/.test(string);
export const removeAccents = (string) => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")