export const BASE_URL = "https://api.moviesexplorer.okzk.com";

export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
      email,
    }),
  }).then((res) => {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(data);
    });
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(data);
    });
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }
      return Promise.reject(data);
    });
  });
};
