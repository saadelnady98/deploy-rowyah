'use client';
import Success from '@/components/Success';
import React, { useState } from 'react'
import ContactUsForm from "@/components/shared/contactUsForm/contactUsForm"
import rocket from "@/public/images/services/Rocket.svg"
import rocket2 from "@/public/images/services/Rocke2t.svg";
import { useTranslations } from 'next-intl';
const ContactUsWrapper = () => {
       const [showSuccessModal, setShowSuccessModal] = useState(false);
    const t =  useTranslations("contactUs")

  return (
    <div>
      <ContactUsForm className=" bg-white rounded-3xl w-full"  
      image={{ url: rocket, width: 24, height: 24 }}
      setShowSuccessModal={setShowSuccessModal}
        image2={{ url: rocket2, width: 24, height: 24 }}  
        serviceMode 
        data-aos="fade-right" 
        title={t("contactFormTitle")} 
        buttonTitle={t("buttonTitle")} 
        buttonStyle="flex justify-center items-center bg-[var(--primary-color)] text-white w-[137px] py-[14px] px-[50px] rounded-[8px] text-[14px] font-bold hover:bg-transparent border border-transparent hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
        />
{showSuccessModal && (
      <div className="fixed h-svh inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <Success /> 
      </div>
    )}
    </div>
  )
}

export default ContactUsWrapper
