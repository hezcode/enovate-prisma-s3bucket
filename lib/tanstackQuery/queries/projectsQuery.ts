const fetchUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/api/project"
    : "/api/project";

interface ProjectTag {
  tag: string;
}

export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  detail: string;
  link: string;
  tag: string[];
}

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(fetchUrl);
  if (!response.ok) throw new Error("Currently unable to fetch projects");
  return response.json();
};
