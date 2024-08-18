import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null);
  const [reloadJob, setReloadJob] = useState(false);

  useEffect(() => {
    axios.get("/job").then(({ data }) => setJob(data));
  }, []);

  return (
    <JobContext.Provider value={{ job, setReloadJob }}>
      {children}
    </JobContext.Provider>
  );
}
