import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NjM2ODI5MTgsImV4cCI6MTY2MzY5MDExOH0.hAu2MaLJEZJVN-GdyngzR9yFC40kYWgrkhNjnZR7Ny4';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BASE_SERVER}/api`,
  headers: { Authorization: `Bearer ${token}` },
});
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log('interceptor', error);
    return Promise.reject(error);
  }
);
export default instance;
