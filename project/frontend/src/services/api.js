import request from './request';
import api from '../configs/api';

export const getGeoCode = async (query, token = null) => {
  const params = {
    query,
  };
  return await request(api.getGeoCode, params, token);
};

export const reverseGeocode = async (geocode, token = null) => {
  const params = {
    geocode,
  };
  return await request(api.reverseGeocode, params, token);
};

export const calculateDistance = async (pointA, pointB, token = null) => {
  const params = {
    pointA,
    pointB,
  };
  return await request(api.calculateDistance, params, token);
};
