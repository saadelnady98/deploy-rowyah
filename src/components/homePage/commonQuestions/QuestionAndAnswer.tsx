"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import Arrow from "@/public/images/questions/vector22.svg";
import Container from "@/components/reusableComponent/Container";
import { useTranslations } from "next-intl";

type FqAItem = {
  question: string;
  answer: string;
};
const QuestionAndAnswer = ( data  : any) => {
      const t = useTranslations("home.faq");
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

      const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex == index ? null : index);
      };
     
   return (
    <section
      className=" text-[var(--primary-color)] mx-auto w-full "
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
      <Container>
        <h2 className="font-bold  text-2xl md:text-4xl text-center pb-16 ">
          {t("title")}
        </h2>
        {data?.data?.map((item : FqAItem, index : number) => (
          <div
            key={index}
            className="bg-[var(--light-color)] rounded-xl py-5 px-5 my-6 mx-2 "
            data-aos="fade-up"
          >
            <button
              className="flex flex-row justify-between w-full"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-lg sm:text-xl lg:text-2xl ltr:text-left rtl:text-right font-normal ">
                {item?.question}
              </span>
              <Image
                src={Arrow}
                alt="arrow"
                className={`w-4 h-4 transform transition-all flex justify-center items-center duration-700 ease-in-out mt-1 rtl:mr-2 ltr:ml-2  ${
                  activeIndex === index ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                activeIndex === index ? "grid-rows-[1fr] pt-5" : "grid-rows-[0fr]"
              }`}
            >
            <div
             className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            >
              <div 
                className={`text-[var(--primary-color)] text-md sm:text-xl font-normal transform transition-all duration-500 ease-in-out ${
                  activeIndex === index 
                    ? 'translate-y-0 opacity-100' 
                    : '-translate-y-2 opacity-0'
                }`}>
                {item?.answer}
              </div>
            </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

export default QuestionAndAnswer
