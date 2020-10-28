import axios from 'axios';

export default (url, params, token = null) => {
  return new Promise((resolve, reject) =>
    axios
      .get(url, {
        cancelToken: token,
        withCredentials: true,
        params,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject('ERROR');
        }
      })
      .catch(error => reject(error)),
  );
};
