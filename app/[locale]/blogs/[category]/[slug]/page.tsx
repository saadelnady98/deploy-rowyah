import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getServicesData, getSingleBlogData } from "@/lib/serverActions";
import HomeSlider from "@/components/homePage/HomeSlider";
import defaultimg from "@/public/defaultimg.png";
import { Metadata } from "next";
import { RTLBreadcrumb } from "@/components/shared/RTLBreadcrumb";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const singleBlog = await getSingleBlogData(slug, locale);
  return {
    title: singleBlog?.data?.title,
    description: singleBlog?.data?.description,
    // openGraph: {
    //   images: [
    //     {
    //       url: singleBlog?.data?.image?.original_url,
    //     },
    //   ],
    // },
  };
}

export default async function Page({ params }: any) {
  const { locale, slug } = await params;
  const t = await getTranslations("services");

  const data = await getSingleBlogData(slug, locale);
  const tansBreadcrumb = await getTranslations("breadcrumb");

   const breadcrumbItems = [
    { label: tansBreadcrumb("home"), href: `/${locale}` },
    { label: tansBreadcrumb("blogs"), href: `/${locale}/blogs` },
    { label: data?.data?.title, href: `#` },
  ];

  return (
    <Container className="!pt-[50px]">
      <RTLBreadcrumb items={breadcrumbItems} />
      <div className="text-center "
     >
        <h6 className="text-xl font-bold text-[var(--primary-color)]"
         data-aos="fade-up"
         data-aos-duration="1500"
         data-aos-delay="300">
          {data?.data?.category_name}
        </h6>
        <h3 className="text-3xl font-bold lg:text-[40px] lg:font-medium mb-8 mt-8"
         data-aos="fade-up"
         data-aos-duration="1500"
         data-aos-delay="300">
          {data?.data?.title}
        </h3>
        <span className="text-[#79796F] inline-block text-base font-light"
         data-aos="fade-up"
         data-aos-duration="1500"
         data-aos-delay="300">
          {data?.data?.date}
        </span>
      </div>

      <Banner
        img={data?.data?.image?.original_url || defaultimg}
        title={""}
        description={""}
        classNameWrapper="!pt-[30px]"
        withoutShadow
      />

      <div className="mt-[35px]"
       data-aos="fade-up"
       data-aos-duration="1500"
       data-aos-delay="300">
        <p
          className="text-[16px] lg:text-xl xl:text-2xl font-medium "
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        />
      </div>
    </Container>
  );
}
