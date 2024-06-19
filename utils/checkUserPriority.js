import { ADMIN } from "../constants/userRoles.js";

export function checkUserPriority(user, priority) {
  if (!user) return false;
  else if (user.user_role == null) return false;
  else if (user.user_role === ADMIN) return true;
  else return !!(user.user_role & priority);
}
