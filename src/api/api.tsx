import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NjI1MTg3NTAsImV4cCI6MTY2MjUyNTk1MH0.Fw8Z2lSADPnk_HRPvPmTeuX6Ac8DnbSVjnR13ha4hpQ';
export default axios.create({
  baseURL: `http://localhost:4000/api/`,
  headers: { Authorization: `Bearer ${token}` },
});
