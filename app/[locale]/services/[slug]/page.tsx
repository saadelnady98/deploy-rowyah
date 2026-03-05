import Banner from "@/components/reusableComponent/Banner";

import { getServicesData, getSingleServiceData } from "@/lib/serverActions";
import HomeSlider from "@/components/homePage/HomeSlider";

import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.png";

import ServiceCard from "@/components/homePage/ServiceCard";

import Image from "next/image";
import serviceIcon from "@/public/serviceIcon.svg";
import Phone from "@/public/images/contactUs/Call.svg";
import Mail from "@/public/images/contactUs/Mail.svg";
import Dev from "@/public/dev.gif";

import Link from "next/link";

import { Metadata } from "next";
import ServiceLeftSection from "@/components/service/ServiceLeftSection";
import ServiceRightSection from "@/components/service/ServiceRightSection";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";

//  const offerIcons = [
//   { icon: Dev, label: "تصميم UI/UX" },
//   { icon: Dev, label: "قاعدة البيانات" },
//   { icon: Dev, label: "لوحة التحكم" },
//   { icon: Dev, label: "التطبيقات الذكية" },
//   { icon: Dev, label: "المواقع الإلكترونية" },
//   { icon: Dev, label: "إدارة السوشيال ميديا" },
//   { icon: Dev, label: "تحسين الـSEO" },
//   { icon: Dev, label: "حماية البيانات" },
// ];

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getSingleServiceData(slug, locale);

  return {
    title: data?.data?.title,
    description: data?.data?.description,
    openGraph: {
      images: [
        {
          url: data?.data?.images?.[0]?.original_url,
        },
      ],
    },
  };
}

export default async function Page({ params }: any) {
  const { locale, slug } = await params;
  const t = await getTranslations("contact.servicesForm");
  const tansBreadcrumb = await getTranslations("breadcrumb");
  const data = await getSingleServiceData(slug, locale);

 
  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("services"), href: `/${locale}/services` },
    { label: data?.data?.title, href: `#` },
  ];

  return (
    <section
      className=" relative bg-white text-[var(--paragraph-color)] mx-auto lg:px-15 xl:px-25 xxl:px-28 py-10 md:py-16 w-full"
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
      <Container className="max-w-none xl:container">
        <RTLBreadcrumb items={breadcrumbItems} />
        <div className="relative flex flex-col lg:flex-row justify-between items-start md:gap-10 lg:gap-20 xl:gap-24 w-full">
          <ServiceLeftSection data={data} className="w-full" />
          <ServiceRightSection data={data} />
        </div>
      </Container>

      {/* ماذا نقدم لك Section */}
      <div className="w-full mt-20">
        <Container>
          {" "}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--primary-color)] mb-12">
            {t("whatWeOffer")}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-y-12 gap-x-2 md:gap-x-8 lg:gap-x-12 text-center">
            {/* {require("./offerIcons").offerIcons.map((item: any, idx: number) => ( */}
            {data?.data?.subservices?.map((service: any, idx: number) => (
              <div
                key={service?.id}
                className="flex flex-col items-center justify-center gap-3 w-full md:w-1/3 lg:w-1/5"
              >
                <div className="flex items-center justify-center h-[85px] w-[120px] mx-auto mb-2">
                  <Image
                    width={300}
                    height={300}
                    src={service?.image?.original_url || Dev}
                    alt={service?.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[var(--dark-color)] text-base md:text-lg font-medium mt-2">
                  {service?.title}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div
        className="mt-20 bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] py-16 w-full"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <Container className="max-w-none xl:container px-0 py-0">
          <h2 className="font-bold text-xl md:text-3xl text-white text-center mb-12">
            {t("work_stages")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-2 md:gap-x-8 text-center">
            {data?.data?.workflow?.map((process: any, index: number) => (
              <div className="rounded-2xl border border-white/40 bg-white/5 p-6 flex flex-col items-center justify-center text-center h-full min-h-[220px] max-w-xs mx-auto">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {index + 1}
                </div>
                <div className="text-lg md:text-xl font-bold text-white mb-1">
                  {process?.title}
                </div>
                <div className="text-sm md:text-base text-white/90 leading-relaxed mt-1 line-clamp-3">
                  {process?.description}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
