import BlogsSection from "@/components/homePage/BlogsSection";
import Container from "@/components/reusableComponent/Container";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";
import { getCategoryData } from "@/lib/serverActions";
import { getTranslations } from "next-intl/server";
import React from "react";
const page = async ({ params }: any) => {
  const { locale, category } = await params;
  //   const t = await getTranslations("blog");

  const data = await getCategoryData(category, locale);
 
  const tansBreadcrumb = await getTranslations("breadcrumb");

  const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("blogs"), href: `/${locale}/blogs` },
    { label: data?.data?.category_name, href: `#` },
  ];

  return (
    <Container className="!pt-0">
      <RTLBreadcrumb items={breadcrumbItems} />
        <h3 className="text-[var(--primary-color)] font-bold text-3xl text-center"
         data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300">
          {data?.data?.category_name}
        </h3>

      <BlogsSection
        locale={locale}
        className="[&_.container]:!px-0"
        withoutHeaderDescription
        withoutShowMore
        data={data?.data?.blogs?.data}
      />
    </Container>
  );
};

export default page;
