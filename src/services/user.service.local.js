import { storageService } from "./async-storage.service";

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
  return storageService.query("user");
}

async function getById(userId) {
  const user = await storageService.get("user", userId);
  return user;
}

function remove(userId) {
  return storageService.remove("user", userId);
}

async function update({ _id, username }) {
  const user = await storageService.get("user", _id);
  user.username = username;
  await storageService.put("user", user);

  // Handle case in which admin updates other user's details
  // METHOD-#3:3 - Saving the updated user to the session storage
  if (getLoggedinUser()._id === user._id) saveLocalUser(user);
  return user;
}

async function login(userCred) {
  const users = await storageService.query("user");
  const user = users.find((user) => user.username === userCred.username);
  if (user) {
    return saveLocalUser(user);
  }
}

async function signup(userCred) {
  // METHOD-#1:.3 - Do some validation && add keys to the user obj if needed...
  if (userCred.password.length < 6)
    return Promise.reject({
      type: "password",
      text: "Password must be at least 4 chars",
    });

  // NOTE: Edit the user is usually in the backend only!, here i do it only because its the localstorage and use generic post function.
  userCred.isAdmin = false;
  userCred.score = 100;

  const users = await getUsers();
  const isUsernameTaken = users.some(
    (user) => user.username === userCred.username
  );

  if (isUsernameTaken)
    return Promise.reject({ type: "username", text: "Username already taken" });

  // NOTE: Save the user to the server (localStroage)
  const user = await storageService.post("user", userCred);

  // NOTE: Save the user locally (sessionStorage)
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

async function changeScore(by) {
  const user = getLoggedinUser();
  if (!user) throw new Error("Not loggedin");
  user.score = user.score + by || by;
  await update(user);
  return user.score;
}

function saveLocalUser(user) {
  user = { _id: user._id, username: user.username, score: user.score };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

// Initial data
// (async ()=>{
//     await userService.signup({email: 'puki@gmail.com', username: 'puki', password:'123',score: 100, isAdmin: false})
//     await userService.signup({email: 'admin@gmail.com', username: 'admin', password:'123', score: 100, isAdmin: true})
// })()
