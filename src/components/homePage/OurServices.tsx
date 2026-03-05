import React from "react";
import Image from "next/image";
import Container from "@/components/reusableComponent/Container";
import MainLink from "@/components/reusableComponent/MainLink";
import title from "@/public/title.svg";
import header from "@/public/header.png";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import { getTranslations } from "next-intl/server";
import ServiceCard from "./ServiceCard";

const OurServices = async ({ data }: { data: any }) => {
  const t = await getTranslations("OurServices");
  return (
    <Container>
      <div 
      data-aos="fade-up"
        data-aos-delay="500">
          
        <SectionTitle
          title={t("our_services_title")}
          description={t("our_services_description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {data?.map((service : any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        {/* Button */}
        <div className="mt-7 lg:mt-10 w-full flex items-center justify-center ">
          {/* <button className="bg-white text-primary-400 px-8 py-3 rounded-full text-sm lg:text-base hover:bg-primary-50 transition-colors w-[134px] h-[45px] lg:w-auto lg:h-auto">
            {t('cta')}
            </button> */}
          <MainLink href="/services" styleMe>
            {t("show_All")}
          </MainLink>
        </div>
      </div>
    </Container>
  );
};

export default OurServices;
