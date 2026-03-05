'use client'
import image1 from "@/public/images/ourProjects/image 3.svg"
import Image from "next/image"
import Container from "../reusableComponent/Container"
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { getTranslations } from "next-intl/server";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../src/swiperCustomStyles.css";
import { Autoplay, Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";
import { useState } from "react";


const designUI = ({ data }: { data: any }) => {
  const t = useTranslations("singleProject")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [hideTimeout, setHideTimeout] = useState(null);

  // Add delay before hiding
  const handleOverlayMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };
  return (
    <Container className="relative gap-8 lg:gap-11">
      <h2 className="text-center text-xl lg:text-[32px] font-bold text-[var(--primary-color)] mb-12">
        {t("ui_design")}
      </h2>

      <div className="flex lg:hidden">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
        <Swiper spaceBetween={16} slidesPerView={2}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            waitForTransition: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 22,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 22,
            },
          }}>
          {data?.map((image: any, index: number) => (
            <SwiperSlide key={index}>

              <Image
                src={image?.original_url || defaultImg}
                alt="image"
                width={1000}
                height={600}
                className="w-full h-full object-cover"
              />


            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid for large screens */}
      <div className="hidden lg:flex flex-wrap justify-between w-full h-full gap-x-10 xxl:gap-x-20 gap-y-7">
        {data.map((image: any, index: number) => (
          <div
            key={index}
            className="w-1/5 cursor-pointer"
            onClick={() => {
              setHoveredIndex(index);
              setActiveSlideIndex(index);
            }}
          >
            <Image
              src={image?.original_url || defaultImg}
              alt="image"
              width={1000}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Click Overlay with Zoom and Slider */}
      {/* {hoveredIndex !== null && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center transition-opacity duration-300"
    onClick={() => setHoveredIndex(null)}
  >
    <div 
      className="relative w-[90%] max-w-4xl h-[80%] bg-white rounded-lg overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      {/* <button
        onClick={() => setHoveredIndex(null)}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> */}

      {/* Image Counter */}
      {/* <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {activeSlideIndex + 1} / {data.length}
      </div> */}

      {/* Swiper for zoomed images */}
      {/* <Swiper 
        spaceBetween={30}
        slidesPerView={1}
        initialSlide={hoveredIndex}
        modules={[Navigation ,Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
          pauseOnMouseEnter :true
          
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {data.map((image: any, index: number) => (
          <SwiperSlide key={index} className="flex items-center justify-center ">
            <Image 
              src={image?.original_url || defaultImg}
              alt={`image-${index}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority={index === hoveredIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* Custom Navigation Buttons */}
      {/* <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Custom Pagination */}
      {/* <div className="swiper-pagination-custom absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"></div> */}
      {/* </div>
  </div>
)} */}

      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-white to-transparent" />

    </Container>
  )
}

export default designUI
