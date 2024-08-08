import { useContext } from "react";
import { UserContext } from "../context/userContext";

const ProjectDetails = () => {
  const { user } = useContext(UserContext);
  const desc =
    "Looking for a video editor to create a high-impact 'Corporate Promo Video.' I need a polished and professional video that highlights our company’s key strengths, values, and services. The video should include sleek transitions, engaging visuals, and a clear narrative that resonates with our target audience. Ideally, it will feature a blend of company footage, testimonials, and dynamic graphics. Deliverables should be ready for both online and offline presentations";

  return (
    <div className="w-2/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl p-10">
      <h1 className="text-3xl font-semibold mb-7 text-slate-600">
        Corporate Promo Video
      </h1>
      <h2 className="text-lg text-violet-600 mb-1">Description</h2>
      <p className="text-[15px] mb-4">{desc}</p>
      <h2 className="text-lg text-violet-600 mb-1">Desired Length</h2>
      <p className="text-[15px] mb-4">3 - 5 minutes</p>
      <h2 className="text-lg text-violet-600 mb-1">Deadline</h2>
      <p className="text-[15px] mb-4">August 21, 2024</p>
      <h2 className="text-lg text-violet-600 mb-1">Contact Information</h2>
      <p className="text-[15px]">{user?.email}</p>
    </div>
  );
};

export default ProjectDetails;
