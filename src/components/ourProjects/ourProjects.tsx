"use client";
import React from "react";
import OurProjectsTabs from "./ourProjectsTabs";
import OurProjectsSlider from "./OurProjectsSliderx";
import Image1 from "@/public/images/ourProjects/image 7.svg";
import { useState } from "react";
import { useTranslations } from "next-intl";

const OurProjects = ({ data }: { data: any }) => {
  const t = useTranslations("home.projects");
   const [activeTab, setActiveTab] = useState(0);
const projectDataNew=data?.map((item :any)=>({...item,item:{service_title:item.name}}))
   return (
    <section data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
      <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-center text-[var(--primary-color)] mb-6">
        {t("title")}
      </h2>

      <OurProjectsTabs
        projectsData={projectDataNew}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <OurProjectsSlider projects={data?.[activeTab]?.projects || []} />
    </section>
  );
};

export default OurProjects;
