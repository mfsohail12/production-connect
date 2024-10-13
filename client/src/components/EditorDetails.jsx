import defaultAvatar from "../assets/default-avatar.jpg";
import { MdEmail } from "react-icons/md";

const EditorDetails = ({ editor }) => {
  const { firstName, lastName, email } = editor;

  return (
    <div className="sm:scale-100 scale-50">
      <div className="w-[25rem] h-[14.375rem] shadow-xl rounded-xl absolute sm:bottom-5 sm:right-2 bottom-8 -right-20 bg-white">
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
    </div>
  );
};

export default EditorDetails;
