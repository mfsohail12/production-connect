const CurrentJob = () => {
  return (
    <div className="w-full h-[150px] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        Current Job
      </h1>
      <div className="px-8 py-4">
        <button className="w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500 bg-violet-200">
          Current Job Title Here
        </button>
      </div>
    </div>
  );
};

export default CurrentJob;
