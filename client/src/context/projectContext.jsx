import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext({});

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("/projects").then(({ data }) => {
      setProjects(data);
    });
  }, [reload]);

  return (
    <ProjectContext.Provider value={{ projects, setReload }}>
      {children}
    </ProjectContext.Provider>
  );
}
