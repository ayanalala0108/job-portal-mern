import React, { useEffect, useMemo } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();

  const { allJobs, searchQuery } = useSelector((store) => store.job);

  // ✅ Reset search only when this component UNMOUNTS
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  // ✅ Strict filtering (title + description only)
  const filteredJobs = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return allJobs;

    return allJobs.filter((job) => {
      const title = String(job?.title || "").toLowerCase();
      const desc = String(job?.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [allJobs, searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl">
          Search Results ({filteredJobs.length})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="col-span-3 text-center text-gray-500 mt-10">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
