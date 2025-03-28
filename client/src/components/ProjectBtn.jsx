import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ProjectContext } from "../context/projectContext";

const ProjectBtn = (props) => {
  const navigate = useNavigate();
  const { setProjectReload } = useContext(ProjectContext);
  const btnStyle =
    props.active === props.id
      ? "w-full sm:text-base text-sm sm:h-[3.125rem] h-10 p-4 rounded-full flex justify-between items-center text-slate-500 bg-violet-200"
      : "w-full sm:text-base text-sm sm:h-[3.125rem] h-10 p-4 rounded-full flex justify-between items-center text-slate-500";

  const handleClick = () => {
    props.setActive(props.id);
  };

  const deleteProject = async (e, projectId) => {
    e.stopPropagation();
    if (confirm("Are you sure want to delete this listing?")) {
      try {
        const { data } = await axios.delete("delete-project", {
          data: { projectId },
        });

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Project Deleted Successfully");
          setProjectReload((prev) => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editTrashElements = (
    <span className="flex gap-4">
      <MdEdit
        className="opacity-30 hover:opacity-100 sm:text-xl text-lg"
        onClick={() => navigate(`/edit-project/${props.active}`)}
      />
      <FaTrash
        className="opacity-30 hover:opacity-100 sm:text-xl text-lg"
        onClick={(e) => deleteProject(e, props.active)}
      />
    </span>
  );

  return (
    <button className={btnStyle} onClick={handleClick}>
      {props.title.length < 35 ? props.title : `${props.title.slice(0, 36)}...`}
      {props.active === props.id && editTrashElements}
    </button>
  );
};

export default ProjectBtn;
