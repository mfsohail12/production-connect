import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects").then(({ data }) => {
      setProjects(data);
    });
  }, []);

  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
}
