import { getTranslations } from "next-intl/server";
import {
  
  getSingleProjectData,
} from "@/lib/serverActions";
 
import { Metadata } from "next";

import ProjectDescription from "@/components/singleProject/ProjectDescription";
import ProjectSteps from "@/components/singleProject/ProjectSteps";
import Problems from "@/components/singleProject/problems";
import ClientFeedback from "@/components/singleProject/ClientFeedback";
import OurProjectsCards from "@/components/shared/projectsCards/ProjectsCards";
import DesignUIx from "@/components/singleProject/DesignUIx";
import image from "@/public/images/ourProjects/image 4 (1).svg";
import SingleProject from "@/components/singleProject/SingleProject";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const  singleProject = await getSingleProjectData(slug, locale);
  return {
    title: singleProject?.data?.name,
    description: singleProject?.data?.short_description,
    openGraph: {
      images: [
        {
          url: singleProject?.data?.image?.original_url,
        },
      ],
    },
  };
}

export default async function Page({ params }: any) {
  const { locale, slug } = await params;

  const tansBreadcrumb = await getTranslations("breadcrumb");

  const t = await getTranslations("projects");

  const data = await getSingleProjectData(slug, locale);

  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("projects"), href: `/${locale}/projects` },
    { label: data?.data?.name, href: `#` },
  ];

  return (
    <section className=" rtl:text-right ltr:text-left flex flex-col gap-20 lg:gap-24 overflow-x-hidden overflow-y-auto">
      <RTLBreadcrumb items={breadcrumbItems} className="-mb-20" />
      <SingleProject data={data} />
      <ProjectDescription data={data?.data} />
      {Array.isArray(data?.data?.phases) && data.data.phases.length > 0 && (
        <ProjectSteps data={data.data.phases} />
      )}
      <Problems data={data.data} />
      {Array.isArray(data?.data?.images) && data.data.images.length > 0 && (
        <DesignUIx data={data.data.images} />
      )}
      {data?.data?.feedback && Object.keys(data.data.feedback).length > 0 && (
        <ClientFeedback data={data.data.feedback} />
      )}
      {data?.data?.similar_projects?.length > 0 && (
        <OurProjectsCards projects={data.data.similar_projects} singleProject />
      )}
    </section>
  );
}
