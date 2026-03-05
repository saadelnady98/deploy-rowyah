"use client";
import Image from "next/image";
import Link from "next/link";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import image from "@/public/images/heroSection/Subtract2.svg";
import image2 from "@/public/images/heroSection/5524750_2862666 2.svg";

import React from "react";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { title } from "process";
import { useTranslations } from "next-intl";
import ContactUsForm from "@/components/shared/contactUsForm/contactUsForm";
import RequestServiceHomeForm from "../RequestServiceHomeForm";
import Success from "@/components/Success";



type Props = {
  title: string;
  description: string;
  button: string;
  button2: string;
};
const hero = ({ locale, data }: { data: any, locale: string }) => {
  const [openForm, setOpenForm] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const t = useTranslations("home");
  // const oldData: Props[] = [
  //   {
  //     title: t("hero.title"),
  //     description: t("hero.description"),
  //     button: t("hero.button"),
  //     button2: t("hero.button2"),
  //   },
  // ];

  return (
    <>
      <section
        className=" md:pt-5"
      >
        <Container>
          <div className="flex flex-col-reverse md:flex-row gap-10 lg:gap-15 xl:gap-20">
            <div className="w-[100%] lg:w-[75%] pt-0 lg:pt-5"
              data-aos="fade-left"
              data-aos-duration="1500"
              data-aos-delay="300">
              <h1 className=" text-[28px] md:text-4xl xl:text-6xl sm:text-5xl font-bold text-[var(--primary-color)] md:pt-1 lg:pt-9 pb-6 transition-transform duration-700 hover:scale-[1.02] ">
                {data?.text}
              </h1>
              <p className="text-[var(--paragraph-color)] text-[16px] lg:text-2xl sm:text-xl pb-8 font-normal transition-transform duration-700 hover:scale-[1.02]">
                {data.description}
              </p>
              <div className="flex flex-row  gap-4 mt-4 w-full">
                <Link
                  href={`/${locale}/contact-us`}
                  className="w-[50%] md:w-[197px]  bg-[var(--primary-color)] text-[16px] font-bold text-center text-white py-3 sm:py-4 px-5 sm:px-15 rounded-lg hover:bg-white hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all duration-300"
                >
                  {t("hero.button")}
                </Link>
                <button
                  onClick={() => {
                    setOpenForm(true);
                  }}
                  className="w-[50%] md:w-[197px] bg-white text-[var(--dark-color)] text-[16px] font-bold text-center py-3 sm:py-4 px-5 sm:px-15 rounded-lg border border-[var(--dark-color)] hover:text-white hover:bg-[var(--primary-color)] transition-all duration-300"
                >
                  {t("hero.button2")}
                </button>
              </div>
            </div>

            <div
              className="relative mx-auto w-[50%] lg:w-[60%] xl:w-[90%] lg:max-w-[300px] aspect-[317/494] mt-0 md:mt-3 bg-zoom-mask"
              style={{
                backgroundImage: `url(${data?.image?.original_url || defaultImg})`,
                WebkitMaskImage: `url(${image.src})`,
                maskImage: `url(${image.src})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>


            {/* <div className="relative w-[90%] lg:w-[25%] md:w-[40%] transition-transform duration-700 hover:scale-110 mt-0 md:mt-3">
  <Image
    width={1000}
    height={1000}
    src={data?.image?.original_url || defaultImg}
    alt="Background Image"
    className="absolute z-0 w-[321px] h-full object-cover"
    priority
  />

  <Image
    width={1000}
    height={1000}
    src={image}
    alt="Overlay Image"
    className="absolute z-10 w-[200px] sm:w-[230px] md:w-[290px] mx-auto mb-10 md:mb-0 mt-5 md:mt-0 animate-[jumpTwice_10s_ease-in-out_infinite] left-1/2 transform -translate-x-1/2"
    priority
  />
</div> */}
          </div>
        </Container>
      </section>

      {openForm ? (
        <RequestServiceHomeForm
          locale={locale}
          className="w-fit bg-white rounded-3xl my-10 "
          data-aos="fade-right"
          setOpenForm={setOpenForm}
          visible={openForm}
          setShowSuccessModal={setShowSuccessModal} // <- pass this down
        />
      ) : showSuccessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Success />
        </div>
      ) : null}
    </>
  );
};

export default hero;
