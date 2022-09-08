import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NjI2MDExODgsImV4cCI6MTY2MjYwODM4OH0.aTkxvsGimE7EjU3Ak9nO69QHR_TJ_4k8_s3EOUCG5tg';
export default axios.create({
  baseURL:  `${import.meta.env.VITE_URL_BASE_SERVER}/api`,
  headers: { Authorization: `Bearer ${token}` },
});
