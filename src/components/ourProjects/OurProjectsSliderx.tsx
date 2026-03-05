"use client";
import Image from "next/image";
// import "../../../../app/css/swiper.css"
import { StaticImageData } from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../src/swiperCustomStyles.css";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import arrowLeft from "@/public/images/ourProjects/arrow-left.svg";
import image from "@/public/images/ourProjects/Seven.png";
import Container from "@/components/reusableComponent/Container";
import arrowLeftWhite from "@/public/images/ourProjects/arrow-left-white.svg";
import { useTranslations } from "next-intl";
import { usePathname } from "../../../navigation";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { useLocale } from "next-intl";
import Link from "next/link";
import bird from "@/public/bird-8788491_1280.jpg"

type Data = {
  image: StaticImageData;
  name: string;
  country: string;
  technologies?: string[];
  short_description: string;
  slug: string;
};

type OurProjectsSliderProps = {
  projects: Data[];
};

const OurProjectsSliderx = ({ projects }: OurProjectsSliderProps) => {
  const t = useTranslations("home.projects");
  // const [isRotated, setIsRotated] = useState(false);
   const locale = useLocale();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const swiperRef = useRef<any>(null);
  // Update Swiper when refs change
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, [prevRef.current, nextRef.current]);

  return (
    <Container className="our-projects">
      <div className=" relative mx-auto">
        <div className="flex ">
          <Swiper
            // [&_.xxx]:bg-red-500 md:[&_.xxx]:bg-green-50
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            className="my-swiper "
            data-aos="fade-up"
            autoplay={{
              delay: 2500, // 2.5 seconds between slides
              disableOnInteraction: false,
              waitForTransition: true,
              pauseOnMouseEnter: true,
            }}
            speed={1100}
            loop={true}
            navigation={{
              prevEl: ".button-prev",
              nextEl: ".button-next",
            }}
            onInit={(swiper) => {
              // Manually link navigation after initialization
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {projects?.map((project : any , index) => (
              <SwiperSlide key={index} className={`my-swiper-slide`}>
                <div className="w-full lg:w-[60%] xl:w-[50%] h-full flex justify-center items-center">
                  <div className="w-full h-full">
                  <Image
                    src={project?.image?.original_url|| defaultImg}
                    // src={bird}
                    alt={project?.title || ""}
                    width={2000}
                    height={1000}
                    unoptimized
                    quality={100}
                    className="mx-auto w-full h-full object-contain "
                  />
                  </div>
                 
                </div>

                <div className="flex flex-col items-start gap-6 w-full lg:w-[40%] xl:w-[50%] my-auto">
                  <h3 className="text-xl md:text-xl xl:text-2xl font-bold text-[var(--primary-color)] line-clamp-2">
                    {project?.name || ""}

                    {/* <span className="xxx">blablabla</span> */}
                  </h3>
                  <div className="flex flex-row gap-28 lg:gap-[10%] xl:gap-[20%] w-full">
                    <p className=" text-[14px] md:text-[16px] text-[var(--dark-color)]">
                      {t("country")} <br />
                      <span className="text-[var(--primary-color)]">
                        {project?.country?.name || ""}
                      </span>{" "}
                    </p>

                    {project?.technologies?.length > 0 && (
                      <p className="text-[14px] md:text-[16px] text-[var(--dark-color)]">
                        {" "}
                        {t("technologies")} <br />{" "}
                        <span className="text-[var(--primary-color)]">
                          {" "}
                          {project?.technologies
                            ?.map((item : any) => item.name)
                            .join(", ")}
                        </span>
                      </p>
                   
                    )}
                  </div>
                  {/* <hr className="text-[var(--primary-color)] w-full h-[0.5px]"/>  */}
                  <p className="border-t border-t-[var(--primary-color)] pt-6 text-[14px] md:text-[16px] text-[var(--dark-color)] line-clamp-3">
                    {project?.short_description || ""}
                  </p>

                  <div className="w-full flex justify-center lg:justify-start group ">
                    <Link
                      className="flex w-full justify-center gap-1.5 bg-[var(--primary-color)] text-[16px] text-white py-3 sm:py-4 px-5 xl:px-3.5 lg:px-6 sm:px-15 w-2xl lg:w-52 rounded-lg hover:bg-white hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all duration-300"
                      href={
                        project?.slug
                          ? `/${locale}/projects/${project.slug}`
                          : " "
                      }
                    >
                      {t("button")}{" "}
                      <Image
                        src={arrowLeftWhite}
                        alt="arrow left"
                        className={`group-hover:hidden block text-[14px] ${
                          locale === "ar" ? "rotate-0" : "rotate-180"
                        }`}
                      />
                      <Image
                        src={arrowLeft}
                        alt="arrow left white"
                        className={`hidden group-hover:block text-[14px] ${
                          locale === "ar" ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {projects.length > 1 && (
        <div className="flex w-full justify-center items-center gap-4 mt-4 lg:mt-0">
          <button ref={nextRef} className="button-prev flex justify-center items-center"  data-aos="fade-left">
            <Image
              src={arrowLeft}
              alt="arrow right"
              className={`lg:rotate-180 flex justify-center items-center ${locale === "ar" ? "max-lg:rotate-180" : ""} `}
            />
          </button>
          <button ref={prevRef} className="button-next flex justify-center items-center" data-aos="fade-right">
            <Image src={arrowLeft} alt="arrow left"   className={` flex justify-center items-center ${locale === "en" ? "max-lg:rotate-180" : ""} `} />
          </button>
        </div>
        )}
      </div>
    </Container>
  );
};

export default OurProjectsSliderx;
