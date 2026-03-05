"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Arrow from "@/public/images/ourProjects/arrow-left.svg";
import { Icon } from "@iconify-icon/react";
import arrow from "@/public/images/ourProjects/Trailing Icon.svg";
import Container from "../reusableComponent/Container";

type ProjectCategory = {
  service_title: string;
  projects: {
    image: string;
    title: string;
    country: string;
    technologies?: string[];
    description: string;
  }[];
};
interface OurProjectsTabsProps {
  projectsData: ProjectCategory[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}
const ourProjectsTabs = ({
  projectsData,
  activeTab,
  setActiveTab,
}: OurProjectsTabsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
   const toggleMenu = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section>
      <Container className="mx-auto md:py-8 w-full ">
        <div className="hidden md:flex  flex-col sm:flex-row items-center gap-0 md:gap-2 xl:gap-2 py-2.5 px-0 sm:px-5 lg:px-5 bg-[var(--light-color)] text-[var(--dark-color)] w-[100%] lg:w-[80%] mx-auto rounded-xl"
         data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
          {projectsData?.map((item, index) => (
            <div key={index} className="mx-auto w-full ">
              <button
                onClick={() => setActiveTab(index)}
                className={`text-[14px] sm:text-[12px] 2xl:text-[16px] font-medium sm:font-bold py-3 px-1 sm:py-3.5 cursor-pointer transition-all duration-300 fade-in-30 fade-out-30 hover:text-[var(--primary-color)] w-full ${
                  activeTab === index
                    ? "text-white  bg-[var(--primary-color)] rounded-xl hover:text-white"
                    : ""
                }`}
              >
                {item.service_title}
              </button>
            </div>
          ))}
        </div>

        {/* Single dropdown menu for small screens */}
        <div className="md:hidden bg-[var(--light-color)] rounded-xl py-5 px-5 w-full mb-6">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
          >
            <span className="text-lg font-bold text-[var(--primary-color)]">
              {projectsData[activeTab].service_title}
            </span>
            <Image
              src={arrow}
              alt="arrow"
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openIndex === 0 ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown items */}
          <div
            className={`transition-all overflow-hidden duration-300 ${
              openIndex === 0
                ? "max-h-96 opacity-100 pt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[var(--light-color)] rounded-xl">
            {projectsData
            .filter((_, index) => index !== activeTab)
            .map((item, index) => {
              const realIndex = projectsData.findIndex(p => p.service_title === item.service_title); // To keep the original index

              return (
                <button
                  key={realIndex}
                  className="block w-full text-right px-1 py-[14px] rounded-md text-lg font-bold text-[var(--primary-color)] hover:text-white bg-[var(--light-color)] hover:bg-[var(--primary-color)] rtl:text-right ltr:text-left"

                  onClick={() => {
                    setActiveTab(realIndex);
                    setOpenIndex(null);
                  }}
                >
                  {item.service_title}
                </button>
              );
            })}

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ourProjectsTabs;
