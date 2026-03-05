'use client'
import React, { useState } from "react";
import Container from "@/components/reusableComponent/Container";
import Image from "next/image";
import ContactUsForm from "@/components/shared/contactUsForm/contactUsForm";
import Icon from "@/public/images/contactUs/message.svg";
import Phone from "@/public/images/contactUs/Call.svg";
import Mail from "@/public/images/contactUs/Mail.svg";
import background from "@/public/images/contactUs/1 (1).svg";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Success from "@/components/Success";
import { useTranslations } from "next-intl";
import rocket from "@/public/images/services/Rocket.svg"
import rocket2 from "@/public/images/services/Rocke2t.svg";
const contactUs = ({ data }: { data: any }) => {
  const t = useTranslations("contact.contact");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <>
      <section
        className="relative bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_45%,_#2F7D8F_75%,_#6599A4_100%)] text-white mx-auto px-4 lg:px-15 xl:px-25 xxl:px-28 py-11 md:py-16 w-full overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <Image
          src={background}
          alt="background"
          className="absolute right-0 rtl:left-0 rtl:right-auto ltr:rotate-[340deg] top-[590px] lg:top-32 scale-90 lg:scale-105 rtl:rotate-[10deg] "
        />
        <Container className="max-w-none xl:container">
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-24 w-full ">
            <div
              className="flex flex-col gap-5 justify-center w-full lg:w-[50%]"
              data-aos="fade-left"
            >
              <div className="p-[17px] bg-white rounded-full w-[70px] flex items-center justify-center">
                <Image src={Icon} alt="contact us icon" className="transition-transform duration-500 hover:scale-[1.05]"></Image>
              </div>
              <h2 className="text-3xl font-bold transition-transform duration-500 hover:scale-[1.02]">
                {data?.title}
              </h2>
              <p className="text-xl font-medium transition-transform duration-500 hover:scale-[1.02]">{data?.description}</p>

              <div className="flex flex-row gap-2">
                <Image src={Phone} alt="phone" />
                <Link href={`tel:${data?.whatsapp}`} className="font-normal text-[18px] transition-transform duration-500 hover:scale-[1.02]" dir="ltr"> {data?.whatsapp} </Link>
              </div>
              <div className="flex flex-row gap-2">
                <Image src={Mail} alt="mail" />
                <Link href={`mailto:${data?.email}`} className="font-normal text-[18px] transition-transform duration-500 hover:scale-[1.02]"> {data?.email} </Link>
              </div>
            </div>
            <ContactUsForm
              className="w-full lg:w-[50%] bg-[linear-gradient(to_top_left,_#195368_0%,_#092D42_50%)] rounded-3xl "
              data-aos="fade-right"
              title={t("formTitle")}
              buttonTitle={t("buttonTitle")}
              contactMode
              image={{ url: rocket, width: 24, height: 24 }}
              image2={{ url: rocket2, width: 24, height: 24 }}
              setShowSuccessModal={setShowSuccessModal}
              buttonStyle="bg-white text-[var(--primary-color)] w-[137px] text-[14px] font-bold rounded-[8px] py-[10px] px-10 hover:bg-transparent hover:text-white border border-transparent hover:border-white"
            />
          </div>
        </Container>
      </section>
      {showSuccessModal && (
        <div className="fixed h-svh inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <Success />
        </div>
      )}
    </>
  );
};

export default contactUs;
