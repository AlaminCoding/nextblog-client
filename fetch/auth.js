import fetch from "isomorphic-fetch";
import Cookies from "js-cookie";

export const signup = (user) => {
  return fetch(`http://localhost:8080/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`http://localhost:8080/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`http://localhost:8080/auth/signout`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

//SET COOKIE
export const setCookie = (key, value) => {
  if (typeof window) {
    Cookies.set(key, value, { expires: 1 });
  }
};

//GET COOKIE
export const getCookie = (key) => {
  if (typeof window) {
    Cookies.get(key);
  }
};

//REMOVE COOKIE
export const removeCookie = (key) => {
  if (typeof window) {
    Cookies.remove(key);
  }
};

//LOCAL_STORAGE
export const setLocalStorage = (key, value) => {
  if (typeof window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window) {
    localStorage.removeItem(key);
  }
};

//SET COOKIE & LOCAL_STORAGE
export const setAuthData = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

//CHECK COOKIE & LOCAL_STORAGE
export const isAuth = () => {
  if (typeof window) {
    const cookieCheck = getCookie("token");
    return cookieCheck;
    // if (cookieCheck) {
    //   if (localStorage.getItem("user")) {
    //     return JSON.parse(localStorage.getItem("user"));
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  }
};
