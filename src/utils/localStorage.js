export const userLocalStorage = (token) => {
  localStorage.setItem("userToken", token);
};
export const removeUserLocalStorage = () => {
  localStorage.removeItem("userToken");
};
