import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectBtn = (props) => {
  const navigate = useNavigate();
  const btnStyle =
    props.active === props.id
      ? "w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500 bg-violet-200"
      : "w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500";

  const handleClick = () => {
    props.setActive(props.id);
    props.setSelectedProjectId(props.id);
  };

  const editTrashElements = (
    <span className="flex gap-4">
      <MdEdit
        className="opacity-30 hover:opacity-100 text-xl"
        onClick={() => navigate(`/edit-project/${props.selectedProjectId}`)}
      />
      <FaTrash className="opacity-30 hover:opacity-100 text-xl" />
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
