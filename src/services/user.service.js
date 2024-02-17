import { httpService } from "./http.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
};

window.userService = userService;

function getUsers() {
  return httpService.get(`user`);
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  return user;
}

function remove(userId) {
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  const updatedUser = await httpService.put(`user/${user._id}`, user);

  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(updatedUser);
  return updatedUser;
}

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);
  if (user) {
    return saveLocalUser(user);
  }
}

async function signup(userCred) {
  const user = await httpService.post("auth/signup", userCred);
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  return await httpService.post("auth/logout");
}

async function changeScore(by) {
  const user = getLoggedinUser();
  if (!user) throw new Error("Not loggedin");
  user.score = user.score + by || by;
  await update(user);
  return user.score;
}

function saveLocalUser(user) {
  user = { _id: user._id, username: user.username, cart: user.cart };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}
