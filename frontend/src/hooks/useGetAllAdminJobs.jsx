import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch(); // ✅ define dispatch

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs)); // ✅ now works
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]); // ✅ add dependency
};

export default useGetAllAdminJobs;
