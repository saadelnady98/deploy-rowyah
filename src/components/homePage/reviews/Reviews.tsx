"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "@/components/reusableComponent/Container";
import Image from "next/image";
import Icon from "@/public/images/reviews/“.svg";
import Image1 from "@/public/images/reviews/Image.svg";
import Image2 from "@/public/images/reviews/Image (1).svg";
import Image3 from "@/public/images/reviews/Image (2).svg";
import background from "@/public/images/reviews/Group.svg";
import defaultImg from "@/public/images/navBar/Mask group.svg";

import { useTranslations } from "next-intl";

type ReviewItem = {
  image: typeof Image1;
  review: string;
  name: string;
  position: string;
   comment: string;

};

interface ReviewsProps {
  data: ReviewItem[];
}
const Reviews = ({ data }: ReviewsProps) => {
  const t = useTranslations("home.reviews");
  // const reviews:  ReviewItem[] = [
  //   {
  //     image: Image1,
  //     review: t("review1.review"),
  //     name: t("review1.name"),
  //     position: t("review1.position"),
  //   },
  //   {
  //     image: Image2,
  //     review: t("review2.review"),
  //     name: t("review2.name"),
  //     position: t("review2.position"),
  //   },
  //   {
  //     image: Image3,
  //     review: t("review3.review"),
  //     name: t("review3.name"),
  //     position: t("review3.position"),
  //   },
  //   {
  //     image: Image1,
  //     review: t("review1.review"),
  //     name: t("review1.name"),
  //     position: t("review1.position"),
  //   },
  //   {
  //     image: Image2,
  //     review: t("review2.review"),
  //     name: t("review2.name"),
  //     position: t("review2.position"),
  //   },
  //   {
  //     image: Image3,
  //     review: t("review3.review"),
  //     name: t("review3.name"),
  //     position: t("review3.position"),
  //   },
  // ];

  return (
    <section>
      <div
        className="bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] py-10 md:py-16 w-full overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <Image
          src={background}
          alt="back ground"
          className="absolute md:w-screen scale-[2.1] transform md:scale-100 rotate-[160deg] md:rotate-0"
        />
        <Container className="max-w-none xl:container md:px-0 py-0">
          <h2 className="font-bold text-2xl md:text-3xl text-white text-center mb-12">
            {" "}
            {t("title")}
          </h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
              waitForTransition: true,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 2,
                speed: 800,
              },
              1024: {
                slidesPerView: 3,
                speed: 800,
              },
            }}
            className="!px-2 sm:!px-0 relative"
          >
            {data?.map((item , index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-14 md:gap-7 items-start py-6 lg:py-16 px-10 h-[100%] text-white rounded-[20px] w-full hover:bg-[linear-gradient(to_top_left,_#195368_0%,_#2F7D8F_60%,_#6599A4_100%)] mx-2 ">
                  {/* Added mx-2 for spacing */}
                  <Image src={Icon} alt="icon" className="w-11" />
                  <div className="flex flex-col">
                    <p className="text-[16px] lg:text-lg font-normal leading-10 hover:scale-[1.03] duration-300 line-clamp-5">
                      {item.comment}
                    </p>
                    <div className="flex gap-4 mt-7 items-center my-auto">
                      <div className="rounded-full ">
                        {item.image?.original_url ? (
                          <Image
                            src={item.image.original_url}
                            alt={item.name || "image"}
                            className="hover:scale-[1.03] duration-300 rounded-full w-[50px] h-[50px] object-cover"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <div className="px-5 py-[14px] object-cover bg-[var(--primary-color)] rounded-full">
                            <span className=" text-white">
                              {item.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="text-[12px] md:text-sm lg:text-xl hover:scale-[1.03] duration-300 line-clamp-1
                         sm:mb-0"
                        >
                          {item.name}
                        </span>
                        <span className="font-normal text-[14px] text-[rgba(255,255,255,0.5)] lg:text-[16px] hover:scale-[1.03] duration-300">
                          {item.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </section>
  );
};

export default Reviews;
