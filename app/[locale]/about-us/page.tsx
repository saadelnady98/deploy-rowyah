 import Container from "@/components/reusableComponent/Container";
 import { DotGrid } from "../../../components/ui/DotGrid";
import { getTranslations } from "next-intl/server";
import React from "react";
 import { getAboutUsData } from "@/lib/serverActions";
import Banner from "@/components/reusableComponent/Banner";
import OurVision from "@/components/about-us/OurVision";

 
import defaultImg from "@/public/images/navBar/Mask group.svg";
import qIcon from "@/public/q.svg";
import Image from "next/image";
import { Metadata } from "next";
 
import OurClients from "@/components/homePage/ourClients/ourClients";
import OurValues from "@/components/about-us/OurValues";
 
import FutureSection from "@/components/about-us/FutureSection";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("about-us-meta.title"),
    description: t("about-us-meta.description"),
    // keywords: [
    //   t("about-us-meta.about_Ruwyah"),
    //   t("about-us-meta.tech_company_saudi_arabia"),
    //   t("about-us-meta.digital_innovation_ksa"),
    //   t("about-us-meta.business_consulting"),
    //   t("about-us-meta.it_experts_saudi"),
    //   t("about-us-meta.technology_partner"),
    // ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("aboutUs");
  const isRTL = locale === "ar";
  const data = await getAboutUsData(locale);
 

  return (
    <section className="flex flex-col gap-[100px] ">
      <Banner
        // img={data?.data?.header?.image?.original_url}
        img={data?.data?.header?.image?.original_url || defaultImg}
        title={data?.data?.header?.title || ""}
        words={data?.data?.header?.words || ""}
        subTitle={data?.data?.header?.sub_title || ""}
        className="!rounded-none "
        classNameWrapper="!pt-5 [&_.layer]:!bg-[#000000B3] [&_.layer]:!opacity-100"
        // description={data?.data?.header?.description}
        description={data?.data?.header?.description || " "}
      />

      <Container className="!py-12">
        <div
          className=" flex relative"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
        >
          <DotGrid
            className={`absolute top-[-50px] left-[30px] md:left-[15px] `}
          />

          <div
            className={`flex flex-col gap-[76px] md:gap-10 lg:gap-[76px] relative z-10  mx-auto md:${
              isRTL ? " md:flex-row-reverse px-5 md:px-0" : " md:flex-row"
            }`}
          >
            {/* ✅ Image Section */}
            <div className="w-full md:w-1/3">
              <div className="relative rounded-[48px] overflow-visible bg-white">
                <div className="relative h-[350px] sm:h-[474px]">
                  <Image
                    src={
                      data?.data?.management_word?.image?.original_url ||
                      defaultImg
                    }
                    alt="مدير"
                    width={2000}
                    height={1500}
                    className="w-full h-full rounded-tr-[48px] rounded-bl-[48px] object-cover relative z-0"
                  />
                </div>
                <div
                  className={`absolute z-[-2] bottom-[-20px] w-16 h-16 bg-[#52B2B3] text-white flex items-center justify-center ${
                    isRTL ? "right-[-20px]" : "left-[-20px]"
                  }`}
                />
              </div>
            </div>

            {/* ✅ Text Section */}
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <div className="mb-6">
                <h2
                  className={`text-2xl md:text-3xl font-bold mb-2 pb-5 border-b-[0.5px] border-[#BEC9CB] ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {data?.data?.management_word?.title || " "}
                </h2>
              </div>

              <h3
                className={`text-xl font-semibold mb-4 text-[var(--primary-color)] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {data?.data?.management_word?.name || " "}
              </h3>

              <div
                className={`text-gray-700 ${
                  isRTL ? "text-right rtl" : "text-left ltr"
                }`}
              >
                <div className="flex gap-2">
                  <Image
                    src={qIcon}
                    width={20}
                    height={20}
                    alt="quote icon"
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="mb-3 leading-relaxed">
                      {data?.data?.management_word?.message || " "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ----------------------------------- */}
      {/* <div className="bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] py-16">
        <Container>
          <AboutUsOurTeam data={data?.data} />
        </Container>
      </div> */}
      {/* ----------------------------------- */}
      <div className="bg-white">
        <Container>
          <OurClients data={data?.data?.clients} />
        </Container>
      </div>

      {/* ----------------------------------- */}
      <div className="h-[550px] lg:h-[650px] xl:h-[750px] ">
        <OurVision data={data?.data?.our_vision} />
      </div>
      <div className="bg-white relative">
        <Container>
          <OurValues data={data?.data} />
        </Container>
      </div>
      <FutureSection />
    </section>
  );
}
