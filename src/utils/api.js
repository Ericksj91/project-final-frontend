class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getInfo(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });
  }
}

const api = new Api({
  baseUrl: "https://api.themoviedb.org/3",
});

export default api;
