import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.png";
import { getBlogData } from "@/lib/serverActions";
import ServiceCard from "@/components/homePage/ServiceCard";
import BlogsSection from "@/components/homePage/BlogsSection";
import defaultimg from "@/public/defaultimg.png";

import { Icon } from "@iconify/react";
import Image from "next/image";
import SectionTitle from "@/components/reusableComponent/SectionTitle";
import MainLink from "@/components/reusableComponent/MainLink";
import { Metadata } from "next";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("blogs.title"),
    description: t("blogs.description"),
    keywords: [
      t("blogs.technology_blog"),
      t("blogs.digital_marketing_tips"),
      t("blogs.ai_insights"),
      t("blogs.business_transformation"),
      t("blogs.saudi_tech_news"),
      t("blogs.software_development_articles"),
      t("blogs.Ruwyah_blog"),
    ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const tansBreadcrumb = await getTranslations("breadcrumb");

  const data = await getBlogData(locale);

  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("blogs"), href: `#` },
    // { label: data?.data?.title, href: `#` },
  ];

  return (
    <Container className="!pt-0">
      {/* <Banner
        img={
          data?.data?.header?.image?.original_url || data?.data?.header?.image
        }
        title={t("title")}
        description={data?.data?.header?.description}
      /> */}

      <RTLBreadcrumb items={breadcrumbItems} />
        <h3 className="text-[var(--primary-color)] font-bold text-3xl text-center"
         data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300">
          {t("title")}
        </h3>

      <BlogsSection
        locale={locale}
        className="[&_.container]:!px-0"
        withoutHeaderDescription
        withoutShowMore
        data={data?.data?.data}
      />
    </Container>
  );
}
