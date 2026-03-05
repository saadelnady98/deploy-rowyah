import React from "react";
import Service from "@/components/singleService/service";
import { getHomeData } from "@/lib/serverActions";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");

  return {
    title: t("services.title"),
    description: t("services.description"),
  };
}

const page = async ({ params }: any) => {
  const { locale } = await params;
  const t = await getTranslations("contact.servicesForm");
  const tansBreadcrumb = await getTranslations("breadcrumb");

  const homeData = await getHomeData(locale);
  const data = homeData?.data;

  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("services"), href: `#` },
  ];

  return (
    <div>
      <RTLBreadcrumb items={breadcrumbItems} />
      <Service data={homeData?.data?.services} />
    </div>
  );
};

export default page;
