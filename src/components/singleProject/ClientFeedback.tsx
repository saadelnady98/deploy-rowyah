"use client"
import React from "react"
import Container from "../reusableComponent/Container"
import imagex from "@/public/images/ourProjects/vectorx.svg"
import image2 from "@/public/images/ourProjects/vector2.svg"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

const ClientFeedback =  ({data}:{data:any}) => {
    const images = [image2, image2, image2, image2, image2]
    const t =  useTranslations("singleProject")
    const  locale  = useLocale(); // get the current locale
    const isRTL = locale === 'ar';
 

    return (
        <section className="bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] py-12  px-4 lg:px-14 relative">
            <div className="flex justify-between px-4 lg:px-14">
                <Image src={imagex} alt="background" width={128} height={83} className={`absolute w-[57px] lg:w-[128px] ${isRTL ? 'right-14' : 'left-14 scale-x-[-1]'}`}
 />
                <Image
                    src={imagex}
                    alt="background"
                    width={128}
                    height={83}
                    className={`absolute w-[57px] lg:w-[128px]  ${isRTL ? 'left-14 scale-x-[-1]' : 'right-14'}`}
                    />
            </div>

            <Container className="flex flex-col gap-4 lg:gap-6 justify-center items-center text-white">
                <h2 className="text-center text-xl lg:text-[32px] font-bold text-white mb-6 mt-4">  {t("client_feedback")} </h2>
                <p className="text-[16px] text-center lg:text-2xl font-normal">
                    {data?.comment}
                </p>
                <span className="text-[16px] lg:text-xl font-bold"> <span> {data?.name} , </span> <span> {data?.position} </span></span>
                <div className="flex gap-3">
                    {images.map((image) => (
                        <Image src={image} alt="star" width={26} height={25} className="w-[17px] lg:w-[26px]" />
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default ClientFeedback
