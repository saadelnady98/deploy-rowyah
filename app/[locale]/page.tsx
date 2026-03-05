interface LayoutProps {
  params: Promise<{ locale: string | any }>; // Handle both promise and object
}
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/homePage/heroSection/hero";
import { getHomeData } from "@/lib/serverActions";
import CommonQuestions from "@/components/homePage/commonQuestions/CommonQuestions";
import OurProjects from "@/components/ourProjects/ourProjects";
import { Metadata } from "next";
import OurServices from "@/components/homePage/ourServices/OurServices";
import Reviews from "@/components/homePage/reviews/Reviews";
import OurClients from "@/components/homePage/ourClients/ourClients";
import ContactUs from "@/components/homePage/contactUs/contactUs";

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("home.title"),
    description: t("home.description"),
    // keywords: [
    //   t("home.Ruwyah"),
    //   t("home.era_skills"),
    //   t("home.saudi_tech_solutions"),
    //   t("home.technology_solutions_Saudi_Arabia"),
    //   t("home.digital_transformation"),
    //   t("home.app_development"),
    //   t("home.ai_consulting"),
    //   t("home.digital_marketing_saudi"),
    //   t("home.it_consulting"),
    //   t("home.website_development_KSA"),
    //   t("home.software"),
    //   t("home.website_programming"),
    //   t("home.app_programming"),
    // ],
  };
}

export default async function Home({ params }: LayoutProps) {
  const { locale } = await params;


  const homeData = await getHomeData(locale);
  // const t = await getTranslations("navigation")
  // const data = await getFilterHotelsData(locale);

  return (
    <>
      <main className=" rtl:text-right ltr:text-left flex flex-col gap-10  ">
        <HeroSection data={homeData?.data?.slider} locale={locale} />
        <OurProjects data={homeData?.data?.projects} />
        <OurClients data={homeData?.data?.clients} />
        <Reviews data={homeData?.data?.feedbacks} />
        <OurServices data={homeData?.data?.services} />
        <CommonQuestions data={homeData?.data?.faqs} />
        <ContactUs data={homeData?.data?.contact?.contacts} />
      </main>
    </>
  );
}
