import React, { useState } from "react";
import Image1 from "@/public/images/services/image 4.svg";
import Container from "@/components/reusableComponent/Container";
import OurProjectsTabs from "@/components/ourProjects/ourProjectsTabs";
import OurProjectsCards from "@/components/shared/projectsCards/ProjectsCards";
import Image2 from "@/public/images/projectsCards/A78485AC84B3_A78488B7868A_8484A5B984A785 1.svg";
import Image3 from "@/public/images/ourProjects/image 4 (1).svg";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getProjectsData } from "@/lib/serverActions";
import ProjectsTabsWrapper from "@/components/projects/ProjectsTabWrapper";
import { Metadata } from "next";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";
interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("projects.title"),
    description: t("projects.description"),
    // keywords: [
    //   t("projects.technology_projects_saudi_arabia"),
    //   t("projects.software_development_case_studies"),
    //   t("projects.digital_marketing_success"),
    //   t("projects.project_highlights_ksa"),
    //   t("projects.Ruwyah_portfolio"),
    // ],
  };
}

const Page = async ({ params }: any) => {
  const { locale, slug } = await params;

  const projects = await getProjectsData(slug, locale);
   const tansBreadcrumb = await getTranslations("breadcrumb");

  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("projects"), href: "#" },
    // { label: data?.data?.title, href: `#` },
  ];

  return (
    <Container>
      <RTLBreadcrumb items={breadcrumbItems} />
      <ProjectsTabsWrapper data={projects?.data} />
    </Container>
  );
};

export default Page;
