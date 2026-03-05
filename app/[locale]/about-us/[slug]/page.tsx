import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { getAboutUsData } from "@/lib/serverActions";
import HomeSlider from "@/components/homePage/HomeSlider";
import defaultimg from "@/public/defaultimg.png";
import { Metadata } from "next";

// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   const { locale, slug } = await params;
//   const singleBlog = await getSingleBlogData(slug, locale);
//   return {
//     title: singleBlog?.data?.title,
//     description: singleBlog?.data?.description,
//     openGraph: {
//       images: [
//         {
//           url: singleBlog?.data?.image?.original_url,
//         },
//       ],
//     },
//   };
// }

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("services");

  const data = await getAboutUsData(locale);

 
  return (
    <Container className="!pt-[50px]">
      {/* {data?.data?.images?.length === 1 && (
        <Banner
          img={data?.data?.images?.[0]?.original_url|| defaultimg}
          title={""}
          description={""}
          withoutShadow
        />
      )}
      {data?.data?.images?.length > 1 && (
        <HomeSlider imagesOnly data={data?.data} />
      )} */}

      <div className="text-center ">
        <h6 className="text-xl font-bold mb-4 text-[var(--primary-color)]">
          {data?.data?.category_name}
        </h6>
        <h3 className="text-3xl font-bold lg:text-[40px] lg:font-medium">
          {data?.data?.title}
        </h3>
        <span className="text-[#79796F] text-base font-light mt-7">
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

      <div className="mt-[35px]">
        <p dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
      </div>
    </Container>
  );
}
