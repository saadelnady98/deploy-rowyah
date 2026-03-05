"use client";
import Image from "next/image";
import React, { useState } from "react";
import serviceIcon from "@/public/serviceIcon.svg";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import ContactUsForm from "@/components/shared/contactUsForm/contactUsForm";
import rocket from "@/public/images/services/Rocket.svg";
import rocket2 from "@/public/images/services/Rocke2t.svg";
import close from "@/public/images/heroSection/Vector.svg";
import AOS from "aos";
import Success from "../Success";

function ServiceLeftSection({
  data,
  className,
  image,
}: {
  data: any;
  className?: string;
  image?: string;
}) {
  const t = useTranslations("contact.contact");
  const locale = useLocale();
  const [openForm, setOpenForm] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    if (openForm) {
      AOS.refresh(); // recalculate positions
      AOS.refreshHard(); // (optional) force full refresh
    }
    setMounted(true);
  }, [openForm]);
  return (
    <>
      <div
        className={`flex flex-col gap-3 lg:gap-5 justify-center mt-10 ${className}`}
        data-aos="fade-left"
      >
        <div className=" flex justify-center items-center bg-gradient-to-br from-[#2F7D8F] to-[#092D42] group-hover:from-[var(--light-color)] group-hover:to-[var(--light-color)] rounded-xl w-16 h-16 relative">
          <Image
            src={data?.data?.image?.original_url || serviceIcon}
            width={80}
            height={80}
            alt="contact us icon"
            className="h-[40px] w-[40px] "
          ></Image>
        </div>
        <h2 className="text-[var(--primary-color)] text-2xl lg:text-3xl font-bold transition-transform duration-300">
          {/* {t("title")} */}
          {data?.data?.title}
        </h2>
        <p className="text-[16px] lg:text-xl font-medium transform duration-300">
          {data?.data?.description}
        </p>

        {/* IT Services Bulleted List Section */}
        <div className="w-full my-5 lg:my-8">
          <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-4 lg:gap-8 rtl:text-right ">
            {data?.data?.subservices?.map((service: any) => (
              <li
                key={service?.id}
                className="flex items-start gap-2 text-[16px] lg:text-lg font-medium text-[var(--paragraph-color)] transform hover:scale-[1.03] duration-300"
              >
                <span className="mt-2 w-3 h-3 bg-[#4CB6BE] rounded-full inline-block p-[5px]"></span>
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-5 w-full">
          <button
            className="flex flex-row-reverse gap-2 group w-[100%] md:w-[30%] items-center justify-center lg:hidden bg-[var(--primary-color)] text-white px-4 rounded-lg hover:bg-white hover:text-[var(--primary-color)] border border-[var(--primary-color)] p-3 text-center hover:bg-opacity-70 group transition-all duration-300 "
            onClick={() => {
              setOpenForm((prev) => !prev);
            }}
          >
            {t("start_your_project")}{" "}
            <span>
              <Image
                src={rocket}
                alt="rocket"
                width={24}
                height={24}
                className="flex group-hover:hidden"
              />
              <Image
                src={rocket2}
                alt="rocket"
                width={24}
                height={24}
                className="hidden group-hover:flex"
              />
            </span>
          </button>
        </div>
      </div>

      {/* ─────────── Mobile form modal ─────────── */}
      {mounted &&
        openForm &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`mx-auto w-full px-0 md:px-4 lg:px-8 py-8 md:w-[400px] lg:w-[600px] z-50 flex items-center justify-center pt-[50px]`}
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
            >
              <ContactUsForm
                title={t("title")}
                description={t("description1")}
                serviceMode
                endPoint="booking"
                serviceId={String(data.data.id)}
                className="fixed m-auto max-w-md bg-white rounded-3xl p-4 z-50 w-full md:w-[400px] lg:w-[600px] transition-all duration-300 transform"
                buttonTitle={t("buttonTitle")}
                buttonStyle="bg-[var(--primary-color)] text-white w-[230px] text-[14px] font-bold rounded-[8px] py-[10px] px-10 hover:bg-transparent hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)]"
                image={{ url: rocket, width: 24, height: 24 }}
                image2={{ url: rocket2, width: 24, height: 24 }}
                setOpenForm={setOpenForm}
                setShowSuccessModal={setShowSuccessModal}
                image3={close}
              />
            </div>
          </div>,
          document.body
        )}

      {/* ─────────── Success Modal ─────────── */}
      {mounted &&
        showSuccessModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Success />{" "}
          </div>,
          document.body
        )}
    </>
  );
}

export default ServiceLeftSection;
