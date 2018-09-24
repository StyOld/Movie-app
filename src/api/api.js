export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "bf6958c14f9e5467fd3b419d03b3a984";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjY5NThjMTRmOWU1NDY3ZmQzYjQxOWQwM2IzYTk4NCIsInN1YiI6IjViOTgwNjc3YzNhMzY4NmM3ODAwMjRlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LxSzrH-Qbkx40KyaKFMOMKHWnCBYAL2oT_t-In2Ldgg";

export const fetchApi = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (response.status < 400) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(response => {
                response.json().then(error => {
                    reject(error);
                });
            });
    });
};