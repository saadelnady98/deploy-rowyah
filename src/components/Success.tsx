"use client";
import Image from 'next/image'
import React from 'react'
import success from "@/public/images/navBar/Layer 2 copy 12.svg"
import { useTranslations } from 'next-intl';

const Success = () => {
  const t = useTranslations("success");
  return (
    <section className="flex items-center justify-center h-screen gap-5 py-10" >
    <div className="bg-white rounded-2xl p-6 w-[496px] max-w-sm text-center shadow-lg"  data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300">
      <Image
        src={success}
        alt="success"
        className="mx-auto mb-4 h-[96px] w-[96px]"
        width={300}
        height={300}
      />
      <p className="text-[16px] font-normal text-[#473954] leading-relaxed ">
        {t("message")}
      </p>
    </div>
  </section>
  )
}

export default Success
