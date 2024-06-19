import { ADMIN } from "../constants/userRoles.js";

/**
 * Проверка доступа по битовой маске
 * @param {object} user
 * @param {number} user.user_role
 * @param {number} access доступ, который нуно проверить
 * @returns {boolean}
 */
export function checkAccess(user, access) {
  if (user.user_role == null) return false;
  else if (user.user_role === ADMIN) return true;
  else return !!(user.user_role & access);
}

/**
 * Проверка админа по роли
 * @param {object} user
 * @param {number} user.user_role
 * @returns {boolean}
 */
export function checkAdmin(user) {
  return user.user_role === ADMIN;
}
