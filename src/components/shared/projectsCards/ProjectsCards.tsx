"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/reusableComponent/Container";
import defultImage from "@/public/defaultimg.png";
import arrowLeft from "@/public/images/ourProjects/arrow-left.svg";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Pagination from "@/components/reusableComponent/Pagination";

type OurProjects = {
    image: { original_url: string };
    name: string;
    technologies?: { name: string | string[] }[]; 
    slug?: string;
  };

interface OurProjectsTabsProps {
  projects: OurProjects[];
  singleProject?: boolean;
}

const ProjectsCards = ({ projects, singleProject }: OurProjectsTabsProps) => {
    const locale = useLocale();
    const t = useTranslations("projectCard");
    const pathname = usePathname();
  
    const isSingleProjectPage =
      pathname.startsWith(`/${locale}/projects/`) &&
      pathname !== `/${locale}/projects`;
  
      const allProjects = projects.flatMap((item: any) => {
        if (Array.isArray(item)) {
          // already flat array of projects
          return item;
        }
        if (item?.projects?.data) {
          // nested projects data
          return item.projects.data;
        }
        // fallback: treat item as a single project object in an array
        return [item];
      });
        const showSlider = isSingleProjectPage && allProjects.length > 2;
  
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      setCurrentPage(1); // Reset on tab/singleProject change
    }, [projects]);
      
    // Pagination slice
    const paginatedProjects = allProjects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const renderCard = (item: any) => (
      <div
        key={item.slug}
        className="bg-[var(--light-color)] rounded-2xl px-4 pt-4 pb-5 "
      >
        <div className="w-full h-fit mx-auto">
          <Image
            src={item?.image?.original_url || defultImage}
            alt="image"
            width={1000}
            height={700}
            className="mx-auto h-full w-full object-contain rounded-[8px]"
          />
        </div>
        <div className="flex justify-between w-full py-3 lg:py-5">
          <span className="font-bold text-lg  line-clamp-1">
            {item?.name}
          </span>
          <Link
          href={item?.slug ? `/${locale}/projects/${item.slug}` : "#"}
          className="flex justify-end text-nowrap items-center gap-2 font-bold text-[12px] md:text-[11px] lg:text-[16px] bg-[var(--light-color)] text-[var(--primary-color)] rounded-lg group rtl:right-0 ltr:left-0"
        >
           {t("button")}
          <div className="bg-[#2F7D8F1A] w-6 h-6 flex items-center justify-center rounded-full text-center ">
          <Image
            src={arrowLeft}
            alt="arrow left"
            className={`inline text-[14px] w-[15px] lg:w-[17px]  transition-all duration-300 ${
              locale === "ar" ? "rotate-45 group-hover:rotate-0" : "rotate-[135deg] group-hover:rotate-180"
            }`}
          />
          </div>
         
          
        </Link>
        </div>
  
        
        {(item?.technologies?.length ?? 0) > 0 && (
            <span className="text-[14px] md:text-[16px] text-left font-medium text-[#089FA0] py-1 px-[10px] bg-[#52B2B31A] rounded-[4px] h-fit">
              {(item?.technologies || [])
                .map((tech : any) =>
                  Array.isArray(tech.name) ? tech.name.join(" , ") : tech.name
                )
                .join(" , ")}
            </span>
          )}
      </div>
    );
  
    return (
      <div className="2xl:container mx-auto md:py-[10px] 2xl:px-24">
        {singleProject && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[var(--primary-color)] mb-10">
            {t("title")}
          </h2>
        )}
  
        {showSlider ? (
          <Swiper
            spaceBetween={40}
            slidesPerView={1}
            modules={[]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              waitForTransition: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="!px-1 w-[93%]"
          >
            {projects?.map((item) => (
              <SwiperSlide key={item.slug || item.name || item.image.original_url}>
                {renderCard(item)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            <section
              className="grid grid-cols-1 md:grid-cols-2 w-full gap-6"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
            >
              {paginatedProjects.map((item) => renderCard(item))}
            </section>
  
            {allProjects.length > itemsPerPage && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(allProjects.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  
export default ProjectsCards;
