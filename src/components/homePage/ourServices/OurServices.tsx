"use client"
import Container from "@/components/reusableComponent/Container"
import defaultImg from "@/public/images/navBar/Mask group.svg"
import Image, { StaticImageData } from "next/image"
import { useState } from "react"

import arrowLeftWhite from "@/public/images/ourProjects/arrow-left-white.svg"
import arrowLeft from "@/public/images/ourProjects/arrow-left.svg"
 
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
type OurServicesProps = {
    image1: StaticImageData
    image2: StaticImageData
    title: string
    description: string
    slug: string
    services: {
        title: string
    }[]
}
const OurServices = ({ data }:  { data:   OurServicesProps[] }) => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);


    const locale = useLocale()
    const pathname = usePathname()
    const langCode = pathname.split("/")[1]
    const isRotated = langCode === "en"

    const t = useTranslations("home.ourservices")
 
    return (
        <Container className="max-w-none xl:container ">
            <div
                className="text-[var(--dark-color)] h-full "
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
            >
                <h2 className="text-[var(--primary-color)] font-bold text-3xl text-center mb-11">{t("title")}</h2>

                <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
                    {data?.map((service : any, index : number ) => (
                    
                        <div
                            key={index}
                            className="group flex flex-col gap-5 bg-[var(--light-color)] rounded-2xl w-full lg:w-1/3 p-5 hover:bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] transition-all duration-500 floating-section "
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                        
                          
                                <div className="bg-gradient-to-br from-[#2F7D8F] to-[#092D42] group-hover:from-[var(--light-color)] group-hover:to-[var(--light-color)] rounded-xl w-16 h-16 relative">
                                <Image
                                    src={service?.image?.original_url || defaultImg} // Your main image path
                                    alt={service.title}
                                    width={40}
                                    height={40}
                                    className="absolute inset-0 m-auto opacity-100 group-hover:invert-[0.7] transition-opacity duration-300"
                                />
                            </div>
                    
                            {/* Text changes to white on hover */}
                            <h3 className="text-2xl font-bold text-[var(--primary-color)] group-hover:text-white transition-colors">
                                {service.title}
                            </h3>
                            <p className="font-medium group-hover:text-white transition-colors">
                                {service.description}
                            </p>

                            <ul className="list-disc px-5 space-y-2">
                                {service.subservices.map((item : any, index : number) => (
                                    <li key={index} className="group-hover:text-white transition-colors">
                                        {item.title}
                                    </li>
                                ))}
                            </ul>

                            {/*  Button also changes color on hover */}

                            <div className="w-full flex justify-center items-center mt-auto">
                                <Link
                                    href={service?.slug ? `/${locale}/services/${service.slug}` : "#"}
                                    className="flex justify-center gap-[6px] bg-[#2F7D8F1A] group-hover:bg-[#F4F1F626] group-hover:text-white text-[16px] text-[var(--primary-color)] py-3 sm:py-4 px-5 w-full rounded-lg transition-all duration-300"
                                >
                                    <span className="group hover:scale-[1.04] transition-all font-normal duration-300 inline">
                                        {" "}
                                        {t("button")}
                                        <Image
                                            src={arrowLeft}
                                            alt="arrow left"
                                            className={`group-hover:hidden text-[14px] inline ${
                                                isRotated ? "rotate-180" : ""
                                            }`}
                                        />
                                        <Image
                                            src={arrowLeftWhite}
                                            alt="arrow left white"
                                            className={`hidden group-hover:inline text-[14px]  ${
                                                isRotated ? "rotate-180" : ""
                                            }`}
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default OurServices
