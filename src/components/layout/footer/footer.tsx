'use client'
import React from "react";
import Image from "next/image";
import Mail from "@/public/images/footer/Mail.svg";
import Phone from "@/public/images/footer/Call.svg";
import Instagram from "@/public/images/footer/instagram black.1.svg";
import Facebook from "@/public/images/footer/facebook black.1.svg";
import Linkedin from "@/public/images/footer/linkedin black.1.svg";
import Snapchat from "@/public/images/footer/snapchat.svg";
import TikTok from "@/public/images/footer/Tiktok.svg";
import Youtube from "@/public/images/footer/youtube color.1.svg";
import Link from "next/link";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import Logo from "@/public/Ruw.png";

type FooterItem = {
  name: string;
  path?: string;
};

const footer = ({ data }: { data: any }) => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const footerItem: FooterItem[] = [
    { name: t("homeLink"), path: "/" },
    {
      name: t("services"), path: `/${locale}/services`
    },
    { name: t("ourPortfolio"), path: `/${locale}/projects` },
    { name: t("aboutUs"), path: `/${locale}/about-us` },
    { name: t("blogs"), path: `/${locale}/blogs` },
    { name: t("FAQs"), path: `/${locale}/faqs` },
    { name: t("contactUs"), path: `/${locale}/contact-us` },


  ];

  return (
    <footer data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300" className="pt-4">
      <Container>

        <Link href="/"><Image src={Logo} alt="Logo" className="mx-auto  h-[80px] w-[170px] object-contain" priority /></Link>
        <div className="xl:grid grid-cols-7 gap-10 px-5 py-6 sm:py-10 flex flex-wrap justify-center items-center max-w-[1300px]  mx-auto">
          {footerItem.map((item, index) => (
            <Link
              key={index}
              href={item.path || "#"}
              className="text-[var(--paragraph-color)] font-medium whitespace-nowrap text-[16px] text-center md:text-xl cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-[#E0E0E0] px-1 md:px-4 ">
          <div className="flex flex-col gap-5 md:flex-row justify-between py-10 ">
            <div className="flex flex-col gap-5 md:flex-row md:gap-5 ">
              <div className="flex flex-row gap-2 mx-auto">
                <Image src={Phone} alt="phone" />
                <Link href={`tel:${data?.contacts?.whatsapp}`} className="font-normal text-[var(--paragraph-color)] " dir="ltr">
                  {data?.contacts?.whatsapp}
                </Link>
              </div>
              <div className="flex flex-row gap-2 mx-auto ">
                <Image src={Mail} alt="mail" />
                <Link href={`mailto:${data?.contacts?.email}`} className="font-normal text-[var(--paragraph-color)] ">
                  {data?.contacts?.email}
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-5 mx-auto md:mx-0">
              {data?.social?.instagram && (
                <Link target="_blank" href={data.social.instagram}>
                  <Image src={Instagram} alt="instagram" />
                </Link>
              )}
              {data?.social?.facebook && (
                <Link target="_blank" href={data.social.facebook}>
                  <Image src={Facebook} alt="facebook" />
                </Link>
              )}
              {data?.social?.linkedin && (
                <Link target="_blank" href={data.social.linkedin}>
                  <Image src={Linkedin} alt="linkedin" />
                </Link>
              )}
              {data?.social?.snapchat && (
                <Link target="_blank" href={data.social.snapchat}>
                  <Image src={Snapchat} alt="snapchat" />
                </Link>
              )}
              {data?.social?.tiktok && (
                <Link target="_blank" href={data.social.tiktok}>
                  <Image src={TikTok} alt="tiktok" />
                </Link>
              )}
              {data?.social?.youtube && (
                <Link target="_blank" href={data.social.youtube}>
                  <Image src={Youtube} alt="youtube" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>

      <div className="flex flex-col md:flex-row justify-center items-center py-4 bg-[var(--light-color)] text-center">
        <span className="text-[var(--dark-color)] flex justify-center items-center font-normal text-[11px] md:text-[16px]">
          {" "}
          {t("copyright")}
        </span>
        <div className="flex justify-center items-center gap-2 ">
          <span className="mx-1 hidden md:flex">|</span>

          <Link href={`/${locale}/privacy`} className=" text-[13px] lg:text-[16px] font-normal lg:font-medium text-[var(--primary-color)] md:text-[#252525] hover:border-b hover:border-b-[var(--primary-color)] hover:text-[var(--primary-color)]">
            {t("privacyPolicy")}
          </Link>
          <span className="mx-1">|</span>
          <Link href={`/${locale}/terms`} className="text-[13px] lg:text-[16px] font-normal lg:font-medium text-[var(--primary-color)] md:text-[#252525]  hover:border-b  hover:border-b-[var(--primary-color)] hover:text-[var(--primary-color)]">
            {t("termsOfService")}
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default footer;
