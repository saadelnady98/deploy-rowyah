/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/reusableComponent/Container"
import ContactUsCardx from "@/components/shared/contactUsCard/ContactUsCardx"
import { getContactUsData } from "@/lib/serverActions"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import ContactUsWrapper from "@/components/shared/contactUsForm/ContactUsWrapper"
import GoogleMap from "@/components/shared/google-maps"
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("contact-us.title"),
        description: t("contact-us.description"),
        keywords: [
            t("contact-us.contact_Ruwyah"),
            t("contact-us.get_in_touch_tech_company"),
            t("contact-us.digital_services_inquiry"),
            t("contact-us.tech_solutions_saudi"),
            t("contact-us.business_consultation"),
            t("contact-us.contact_page"),
        ],
    };
}

interface LayoutProps {
    params: Promise<{ locale: string | any }> // Handle both promise and object
}

export default async function Page({ params }: LayoutProps) {
    const { locale } = await params
    const t = await getTranslations("contactUs")
    const contactData = await getContactUsData(locale)
 
    const long = contactData?.data?.[0]?.location?.long;
    const lat = contactData?.data?.[0]?.location?.lat;
    // const iframSrc =
    //     locale === "ar"
    //         ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sar!2seg!4v1709465154599!5m2!1sar!2seg`
    //         : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzUuOSJF!5e0!3m2!1sen!2sus!4v1709465154599!5m2!1sen!2sus`

    return (
        <Container >
            <h2 className="font-bold text-xl md:text-3xl text-[var(--primary-color)] text-center mx-auto mb-2" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
                {t("title")}
            </h2>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16">
                <ContactUsWrapper/>
                  <div className="py-2 lg:py-12 " data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
                    <iframe src={iframSrc} title={t("mapTitle")} className="w-full h-[320px] lg:h-full"></iframe>
                </div>
            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16">
                <ContactUsWrapper />

                <div className="py-2 lg:py-12" data-aos="fade-up">
                    {/* {lat && long ? (
                        <GoogleMap
                            lat={lat}
                            lng={long}
                        />
                    ) : (
                        <div className="bg-gray-100 h-full flex items-center justify-center">
                            Map data unavailable
                        </div>
                    )} */}

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7428.664723125659!2d39.86075719942208!3d21.416177418787008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c205ffc1137cdb%3A0xba8040ebbe12c017!2sMakkah%20al%20Aziziah!5e0!3m2!1sen!2seg!4v1767010347802!5m2!1sen!2seg" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <h2
                className="font-bold text-[16px] lg:text-2xl text-[var(--primary-color)] mx-auto mt-20 mb-3"
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
            >
                {t("cardTitle")}
            </h2>
            <p className="text-[#473954] text-[16px] lg:text-xl" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
                {t("cardDescription")}
            </p>

            <ContactUsCardx data={contactData?.data} long={long} lat={lat} />
        </Container>
    )
}
