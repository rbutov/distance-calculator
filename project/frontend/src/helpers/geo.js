import {getGeoCode, reverseGeocode} from '../services/api';

/**
 * _check if string is lat-lng
 * @param {string} string: _string for check
 * @returns {boolean}: _if lat-lng
 */
export const isLatLng = string => {
  const tmp = string.split(',');
  if (tmp.length !== 2) return false;
  return !(isNaN(tmp[0]) || isNaN(tmp[1]));
};

/**
 * _get and validate data from API
 * @param {function} dispatch: _redux dispatch hook
 * @param {string} value: _current value of input
 * @param {function} updatePoint: _point update action
 * @param {function} validInput: _validate status update action
 * @returns {Promise<unknown>}
 */
export const validateGeo = (dispatch, value, updatePoint, validInput) => {
  return new Promise((resolve, reject) => {
    if (value === '') {
      dispatch(validInput(false));
      reject('empty string');
      return;
    }

    if (!isLatLng(value)) {
      getGeoCode(value)
        .then(res => {
          dispatch(validInput(true));
          dispatch(
            updatePoint({
              location: res.location,
              geo: res.geo,
            }),
          );

          resolve(res.geo);
        })
        .catch(error => {
          dispatch(validInput(false));
          reject(error);
        });
    } else {
      reverseGeocode(value)
        .then(res => {
          dispatch(validInput(true));
          dispatch(
            updatePoint({
              location: res.location,
              geo: res.geo,
            }),
          );

          resolve(res.geo);
        })
        .catch(error => {
          dispatch(validInput(false));
          reject(error);
        });
    }
  });
};
