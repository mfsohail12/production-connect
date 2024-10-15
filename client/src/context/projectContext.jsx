import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext({});

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [projectReload, setProjectReload] = useState(false);

  useEffect(() => {
    axios.get("/projects").then(({ data }) => {
      setProjects(data);
    });
  }, [projectReload]);

  return (
    <ProjectContext.Provider value={{ projects, setProjectReload }}>
      {children}
    </ProjectContext.Provider>
  );
}
