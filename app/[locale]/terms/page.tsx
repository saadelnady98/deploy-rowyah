import Banner from "@/components/reusableComponent/Banner";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import pic1 from "@/public/card.png";
import { getTermsData } from "@/lib/serverActions";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("terms.title"),
    description: t("terms.description"),
    // keywords: [
    //   t("terms.terms_of_service"),
    //   t("terms.website_terms"),
    //   t("terms.Durrat_Tayba_terms"),
    //   t("terms.conditions_of_use"),
    // ],
  };
}

export default async function Page({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("terms");

  const data = await getTermsData(locale);

  return (
    <Container className="!pt-0">
      {/* <Banner img={data?.data?.header?.image?.original_url} title={t("title")} description={data?.data?.header?.text} /> */}
      <h2 className="font-bold text-[32px] text-[var(--primary-color)] mb-10 mt-16 text-center"> {t("title")}</h2>
      {data?.data?.info && (<div dangerouslySetInnerHTML={{ __html: data?.data?.info }}  />)}
      
    </Container>
  );
}
