const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://job-portal-mern-qpwd.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
