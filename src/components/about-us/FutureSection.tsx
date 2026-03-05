'use client'
import React, { use, useState } from 'react'
import Container from '../reusableComponent/Container';
import Button from "@/components/shared/contactUsCard/Btns/Button";
import RequestServiceHomeForm from '../homePage/RequestServiceHomeForm';
import Success from '../Success';
import { useLocale, useTranslations } from 'next-intl';

const FutureSection = () => {
     const [openForm, setOpenForm] = useState(false);
      const [showSuccessModal, setShowSuccessModal] = useState(false);
      const locale = useLocale();
      const t =  useTranslations("aboutUs");

  return (
    <>
    <Container>

     
<div className="flex flex-col md:flex-row justify-center items-center md:justify-between bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_45%,_#2F7D8F_75%,_#6599A4_100%)] py-10 px-8 rounded-[8px]"
 data-aos="fade-up"
 data-aos-duration="1500"
 data-aos-delay="300">
  <div className="w-[100%] md:w-[30%] lg:w-[50%]">
  <h2 className="text-[32px] font-bold text-white text-center md:text-start" > {t("ready_for_future")}</h2>

  </div>
  <div className="flex flex-col md:flex-row gap-4 mt-4 items-center justify-end w-[100%] md:w-[70%] lg:w-[50%] ">
  <Button  href={`/${locale}/contact-us`} className="flex justify-center items-center w-[100%]  md:w-[40%] font-bold bg-white text-md text-[var(--primary-color)] py-3 sm:py-4 px-5 xl:px-25 lg:px-15 sm:px-15 rounded-lg transform duration-300 hover:bg-transparent hover:text-white hover:border hover:border-white" title={t("contact_us")} />
  <Button 
   onClick={() => {
    setOpenForm(true);
  }}
   className="flex justify-center items-center w-[100%] md:w-[40%] font-bold bg-trasparent text-white text-md py-3 sm:py-4 px-5 xl:px-25 lg:px-15 sm:px-15 rounded-lg border border-white hover:text-[var(--primary-color)] hover:bg-white" title={t("request_quote")} />
       
      </div>
</div>
</Container>
 {openForm ? (
    <RequestServiceHomeForm
      locale={locale}
      className="w-fit bg-white rounded-3xl "
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
    
  )
}

export default FutureSection
