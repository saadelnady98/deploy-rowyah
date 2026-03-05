"use client";
import React, { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../src/swiperCustomStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image, { StaticImageData } from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import teamMember1 from "@/public/images/ourTeam/Rectangle 13.svg";
import arrowLeft from "@/public/images/ourProjects/arrow-left.svg";
import Container from "@/components/reusableComponent/Container";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
type Team = {
  image: typeof teamMember1;
  name: string;
  position: string;
};
const OurTeam = ({ data }: {  data: Team[]}) => {
  const locale = useLocale();
  const t = useTranslations("home.ourTeam");
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
    <section className="our-team px-4 md:px-5 xl:px-24 2xl:px-16 w-[48%] sm:w-[40%] md:w-[60%] lg:w-[70%]  xl:w-[70%] 2xl:w-[60%] !mx-auto">
      <div
        className="relative "
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <h2 className="font-bold text-xl md:text-3xl text-[var(--primary-color)] text-center mx-auto mb-6 lg:mb-10">
          {t("title")}
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          className="my-swiper"
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            // Add this property
            delay: 2500, // 2.5 seconds between slides
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          navigation={{
            prevEl: ".button-prev",
            nextEl: ".button-next",
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 25,
            },
          }}
        >
          {data?.map((member  , index  : number) => (
            <SwiperSlide
              key={index}
              className="my-swiper-slide "
            >
              <div className="flex flex-col bg-[var(--light-color)] justify-center items-center md:items-start mx-auto rounded-[16px] w-full max:h-[650px]  ">
               <div className="overflow-hidden h-[281px] xl:h-[344px] 2xl:h-[390px] 3xl:h-[430px] w-full rounded-t-[16px] bg-white">
              
                <Image
                  src={member?.image?.original_url || defaultImg}
                  alt={member?.name || "team member"}
                  className=" w-full h-full mx-auto hover:scale-105 duration-300 object-cover"
                  width={5000}
                  height={1500}
                />
                  
               </div>
                <div className="flex flex-col px-4 py-5 gap-2 w-[190px] sm:w-[200px] md:w-[216px] lg:w-[325px] ">
                  <span className="text-[14px] md:text-[16px] lg:text-xl text-[var(--primary-color)]  font-bold hover:scale-[1.03] duration-300">
                    {member?.name}
                  </span>
                  <span className="text-[var(--paragraph-color)] text-[12px] sm:text-[14px] md:text-[16px] hover:scale-[1.03] duration-300 ">
                    {member?.position}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex flex-row w-full justify-center gap-10 md:hidden mt-5">
          {/* Fix: Swap ref assignments here */}
          <button ref={prevRef} className="button-prev">
            <Image
              src={arrowLeft}
              alt="arrow right"
              className={` ${locale === "ar" ? "rotate-180" : ""} `}
            />
          </button>
          <button ref={nextRef} className="button-next">
            <Image
              src={arrowLeft}
              alt="arrow left"
              className={` ${locale === "ar" ? "rotate-0 " : "rotate-180"} `}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
export default OurTeam;
