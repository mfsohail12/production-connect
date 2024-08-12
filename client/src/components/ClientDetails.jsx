import defaultAvatar from "../assets/default-avatar.jpg";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { JobContext } from "../context/jobContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const ClientDetails = () => {
  const { job } = useContext(JobContext);
  const [client, setClient] = useState({});

  useEffect(() => {
    axios.get("/client-info").then(({ data }) => {
      setClient(data);
    });
  }, []);

  return (
    <div className="w-full h-[230px] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        Client Details
      </h1>
      <div className="p-7 flex gap-3">
        <img src={defaultAvatar} className="w-28 h-28" />
        <span className="flex flex-col justify-between py-1 text-slate-600">
          <h1 className="text-3xl font-semibold">
            {client?.firstName} {client?.lastName}
          </h1>
          <p>
            <MdEmail className="inline mr-2 text-lg" />
            {client?.email}
          </p>
          {job?.phone && (
            <p>
              <FaPhoneAlt className="inline mr-2 text-md" />
              {job.phone}
            </p>
          )}
        </span>
      </div>
    </div>
  );
};

export default ClientDetails;
