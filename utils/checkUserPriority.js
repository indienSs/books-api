import { ADMIN } from "../constants/userRoles.js";

/**
 * Проверка доступа по битовой маске
 * @param {object} user
 * @param {number} user.user_role
 * @param {number} priority доступ, который нуно проверить
 * @returns {boolean}
 */
export function checkUserPriority(user, priority) {
  if (!user) return false;
  else if (user.user_role == null) return false;
  else if (user.user_role === ADMIN) return true;
  else return !!(user.user_role & priority);
}

/**
 * Проверка админа по роли
 * @param {object} user
 * @param {number} user.user_role
 * @returns {boolean}
 */
export function checkAdmin(user) {
  return user?.user_role === ADMIN;
}
