"use client";

import Image from "next/image";
import defaultImg from "@/public/defaultimg.png";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

function AboutUsOurTeam({ data }: { data: any }) {
  const t = useTranslations("about-us");
  const locale = useLocale();
  const [isBlurred, setIsBlurred] = useState(true);

  // Click handler for mobile
  const handleImageClick = () => {
    if (window.innerWidth < 1024) {
       setIsBlurred((prev) => !prev);
    }
  };
   return (
    <div
      className="relative teamSection  "
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
      <h2 className="font-bold text-xl md:text-3xl text-white text-center mx-auto mb-6">
        {data.team_header.title|| " "}
      </h2>

      <p className="text-center text-xl text-white mb-10">
      {data.team_header.description|| " "}
      </p>

      <Swiper
        modules={[Navigation , Autoplay]}
        className="my-swiper xl:w-[1100px] "
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
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },  
        }}
      >
        {data?.teams?.map((member: any, index: any) => (
          <SwiperSlide key={index} className="my-swiper-slide duration-300 ">
            <div className="flex flex-col justify-center items-center mx-auto lg:items-start w-full max:h-[650px] overflow-hidden "> 
              <div className={`h-[281px] xl:h-[324px] w-[256px] xl:w-[305px] overflow-hidden ${locale === "ar" ? "rounded-tr-[40px] rounded-bl-[40px]" : "rounded-br-[40px] rounded-tl-[40px]"} `}
              >
              <Image
                src={member?.image?.original_url || defaultImg}
                alt={member?.name || "team member"}
                className={`w-full mx-auto h-full transition-all duration-700  blur-sm hover:blur-0 object-fit ${locale === "ar" ? "rounded-tr-[40px] rounded-bl-[40px]" : "rounded-br-[40px] rounded-tl-[40px]"} `}
                width={2000}
                height={1500}
                onClick={handleImageClick}
              />
              </div>
            
              <div className="flex flex-col px-2 py-2 w-[256px] lg:w-[325px] ">
                <span className="text-[20px] md:text-[22px] text-white font-bold transform hover:scale-[1.03] duration-300">
                  {member?.name || " "}
                </span>
                <span className="text-white text-[12px] sm:text-[14px] md:text-[18px] transform hover:scale-[1.03] duration-300 ">
                  {member?.position || " "}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AboutUsOurTeam;
