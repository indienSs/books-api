export function checkUserPriority(user, priorities) {
  if (!user?.user_role) return false;
  else if (user.user_role === 0) return true;
  else return false;
}
