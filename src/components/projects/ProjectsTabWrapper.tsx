"use client";
import { useEffect, useState } from "react";
import OurProjectsTabs from "@/components/ourProjects/ourProjectsTabs";
import OurProjectsCards from "@/components/shared/projectsCards/ProjectsCards";
import Pagination from "../reusableComponent/Pagination";

type Project = {
  id: number;
  slug: string;
  name: string;
  image: {
    original_url: string;
  };
};

type PaginationMeta = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
};

type ProjectResponse = {
  data: Project[];
  pagination: PaginationMeta;
};

const ProjectsTabsWrapper = ({ data }: { data: any[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const activeService = data[activeTab];

  useEffect(() => {
    const fetchProjects = async () => {
      if (!activeService || !activeService.projects) return;

      const paginated = activeService.projects.pagination;
      const staticData = activeService.projects.data;

      if (paginated && paginated.path) {
        try {
          const res = await fetch(`${paginated.path}?page=${currentPage}`);
          const json: ProjectResponse = await res.json();
          setCurrentProjects(json.data || []);
          setPagination(json.pagination);
        } catch (error) {
          console.error("Error fetching paginated projects:", error);
          setCurrentProjects([]);
          setPagination(null);
        }
      } else {
        setCurrentProjects(staticData || []);
        setPagination(null);
      }
    };

    fetchProjects();
  }, [activeTab, currentPage]);

  // Reset page to 1 on tab switch
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

   return (
    <>
      <OurProjectsTabs
        projectsData={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <OurProjectsCards projects={currentProjects} />

     
    </>
  );
};

export default ProjectsTabsWrapper;
