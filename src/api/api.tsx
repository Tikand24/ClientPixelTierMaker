import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NjMyOTUyNTAsImV4cCI6MTY2MzMwMjQ1MH0.-TZ9ZvIRc_bVceo4O50B-QP5Bg1OXLVrOZSlO49l_Cw';

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
