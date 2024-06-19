/**
 * Генерация случайной строки из букв и чисел установленной длины
 * @param {number} [length]
 * @returns
 */
export function generateRandomString(length = 16) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.join("");
}
