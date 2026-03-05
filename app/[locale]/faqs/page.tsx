 import Container from "@/components/reusableComponent/Container";
  import { getFaqs } from "@/lib/serverActions";
 import QuestionAndAnswer from "@/components/homePage/commonQuestions/QuestionAndAnswer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("faqs.title"),
    description: t("faqs.description"),
    // keywords: [
    //   t("faqs.FAQs"),
    //   t("faqs.hotel_management_questions"),
    //   t("faqs.Durrat_Tayba_help"),
    //   t("faqs.hospitality_FAQs"),
    // ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  // const t = await getTranslations("faqs");

  const data = await getFaqs(locale);
   return (
    <>
      <Container className="!pt-0">
        {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
        {/* <QuestionAndAnswer data={data?.data}/> */}
        <QuestionAndAnswer data={data?.data}/>
      </Container>
    </>
  );
}
