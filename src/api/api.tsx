import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NzI0MTM0MTgsImV4cCI6MTY3MjQyMDYxOH0.2Rfgm7gE0VsWdht7Sbr2s80zryvytsyKdvd54em1A5k';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BASE_SERVER}/api`,
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
