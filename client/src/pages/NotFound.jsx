import { useNavigate } from "react-router-dom";
import { HiExclamationTriangle } from "react-icons/hi2";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <HiExclamationTriangle className="text-8xl text-violet-600" />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <button
        className="text-white bg-violet-600 hover:bg-violet-700 rounded-md px-3 py-2 mt-2"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </section>
  );
};

export default NotFoundPage;
