"use client";
import call from "@/public/images/contactUs/call-calling.svg";
import buildings from "@/public/images/contactUs/buildings.svg";
import sms from "@/public/images/contactUs/sms.svg";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
type ContactUsCardProps = {
  icon?: string;
  title?: string;
  description?: string;
  data?:  any;
  href?: string;

  target?: string;
  whatsapp?: boolean;
}[];

const ContactUsCardx = ({
  data,
  long,
  lat,
}: {
  data: any;
  long: string;
  lat: string;
}) => {
  const t = useTranslations("contactUs");
  const number = data?.[0]?.contacts?.whatsapp;
  const formatted = number
    ?.toString()
    .replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, "+$1 $2 $3 $4");
  // console.log("data",data)
  const contactUsData: ContactUsCardProps = [
    {
      icon: call,
      title: t("cards.card1.title"),
      description: t("cards.card1.description"),
      data: formatted,
      href: `tel:${data?.[0]?.contacts?.whatsapp}`,
      whatsapp: true,
    },

    {
      icon: sms,
      title: t("cards.card3.title"),
      description: t("cards.card3.description"),
      data: data?.[0]?.contacts?.email,
      href: `mailto:${data?.[0]?.contacts?.email}`,
    },
    {
      icon: buildings,
      title: t("cards.card2.title"),
      description: t("cards.card2.description"),
      data: data?.[0]?.address?.text,
      href: `https://maps.google.com/?q=${lat},${long}`,
      target: "_blank",
    },
  ];

  return (
    <section
      className="flex flex-col md:flex-row gap-6 md:gap-30 lg:gap-44 mt-10 "
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
    {contactUsData.map((item, index) => (
  <div
    key={index}
    className="flex flex-col lg:items-start items-center w-full md:w-1/3"
  >
    <div className="bg-[var(--light-color)] rounded-full w-16 h-16 relative">
      <Image
        src={item.icon || defaultImg}
        alt="icon"
        width={28}
        height={28}
        className="absolute inset-0 m-auto"
      />
    </div>

    <span className="text-lg lg:text-xl font-bold text-[var(--dark-color)] mt-4">
      {item.title}
    </span>

    <span className="text-[14px] lg:text-[16px] font-medium text-[#473954] mt-1">
      {item.description}
    </span>

    {item.href && (
      <Link
        target={item.target || "_self"}
        href={item.href}
        dir={item.whatsapp ? "ltr" : undefined}
        className="text-[14px] lg:text-[16px] font-medium text-[var(--primary-color)] mt-6"
      >
        {item.data}
      </Link>
    )}
  </div>
))}

    </section>
  );
};
export default ContactUsCardx;
