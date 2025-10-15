import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const AdminJobsTable = () => {
  useGetAllJobs(); // ✅ fetch jobs when component loads
  const { allJobs } = useSelector((store) => store.job);

  if (!allJobs || allJobs.length === 0) {
    return (
      <div className="p-4 text-gray-500">You have not posted any jobs yet</div>
    );
  }

  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allJobs.map((job) => (
            <TableRow key={job._id}>
              {/* Company Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{job?.company?.name || "N/A"}</span>
                </div>
              </TableCell>

              {/* Role Column */}
              <TableCell>{job?.title}</TableCell>

              {/* Date Column */}
              <TableCell>
                {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
              </TableCell>

              {/* Actions Column */}
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
