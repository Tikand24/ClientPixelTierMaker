import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4MDY5Yjc0YzEyOGEwMTQzMGE3YmIiLCJyb2xlIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2NjMwMzM3ODksImV4cCI6MTY2MzA0MDk4OX0.4WdHixJ0v7HORUcz9Xn1i3HtsSXbyVafKo4IY5nWr38';
export default axios.create({
  baseURL:  `${import.meta.env.VITE_URL_BASE_SERVER}/api`,
  headers: { Authorization: `Bearer ${token}` },
});
