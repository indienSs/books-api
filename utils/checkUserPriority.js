import { ADMIN } from "../constants/userRoles.js";

export function checkUserPriority(user, priorities) {
  if (!user?.user_role) return false;
  else if (user.user_role === ADMIN) return true;
  else return false;
}
