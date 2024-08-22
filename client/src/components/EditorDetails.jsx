import defaultAvatar from "../assets/default-avatar.jpg";
import { MdEmail } from "react-icons/md";

const EditorDetails = ({ editor }) => {
  const { firstName, lastName, email } = editor;

  return (
    <div className="w-[400px] h-[230px] shadow-xl rounded-xl absolute bottom-28 right-14 bg-white">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        Editor Details
      </h1>
      <div className="p-7 flex gap-3">
        <img src={defaultAvatar} className="w-28 h-28" />
        <span className="flex flex-col py-1 text-slate-600">
          <h1 className="text-3xl font-semibold">
            {firstName} {lastName}
          </h1>
          <p>
            <MdEmail className="inline mr-2 text-lg" />
            {email}
          </p>
        </span>
      </div>
    </div>
  );
};

export default EditorDetails;
