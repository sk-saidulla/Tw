import { handleResponse } from "../helper/handle-response";
import Config from "../config";
import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
export const AuthenticationService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  login,
  logout,
};
function login(userName, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  };
  return fetch(`${Config.SERVER_URL}/auth/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    });
}

async function logout() {
  await localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
