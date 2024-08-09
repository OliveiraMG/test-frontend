import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const fetchCMVData = () => api.get('/products/cmv');
export const fetchGroupsMostSold = () => api.get('/products/groups-most-sold');
export const fetchProductsLeastSold = () => api.get('/products/least-sold');
export const addOrUpdateProduct = (product) => api.post('/products', product);