import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0] || null;
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      if (input.file) formData.append("file", input.file);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true, // important for JWT cookies
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and upload your resume.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { id: "fullname", label: "Name", value: input.fullname },
              { id: "email", label: "Email", value: input.email },
              { id: "phoneNumber", label: "Number", value: input.phoneNumber },
              { id: "bio", label: "Bio", value: input.bio },
              {
                id: "skills",
                label: "Skills",
                value: input.skills,
                placeholder: "e.g. JavaScript, React, Node.js",
              },
            ].map((field) => (
              <div
                className="grid grid-cols-4 items-center gap-4"
                key={field.id}
              >
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  value={field.value}
                  placeholder={field.placeholder || ""}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            ))}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
