export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }
  return true;
};
