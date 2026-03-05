import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import Container from "@/components/reusableComponent/Container";
import { getTranslations } from "next-intl/server";
const OurClients = async ({ data }: { data: any }) => {
  const t = await getTranslations("home.ourClients");
  const halfwayIndex = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, halfwayIndex);
  const secondHalf = data.slice(halfwayIndex);
  return (
    <div dir="ltr">
      <Container>
        <div
          className="w-full"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
        >
          <h2 className="text-3xl text-center text-[var(--primary-color)] font-bold mb-10 ">
            {t("title")}{" "}
          </h2>

          <Marquee
            className=""
            pauseOnHover
            speed={100}
            gradient={true}
            autoFill={true}
            direction="left"
          >
            <div className="flex items-center justify-center h-32 overflow-hidden ">
              {firstHalf?.map((logo : any, index : number) => (
                <div
                  key={index}
                  className="w-[120px] transition-transform duration-700 hover:scale-110 mx-10 "
                >
                  <Image
                    src={logo.image.original_url || defaultImg}
                    alt={`Logo ${index + 1}`} // Unique alt text to avoid warnings
                    className="w-full object-cover"
                    width={200}
                    height={100} 
                  />
                </div>
              ))}
            </div>
          </Marquee>

          <Marquee
            className=""
            pauseOnHover
            speed={100}
            gradient={true}
            autoFill={true}
            direction="right"
          >
            <div className="flex items-center justify-center h-32 overflow-hidden">
              {secondHalf?.map((logo : any, index : number) => (
                <div
                  key={index}
                  className="w-[120px] transition-transform duration-700 hover:scale-110 mx-10 "
                >
                  <Image
                    src={logo.image.original_url || defaultImg}
                    alt={`Logo ${index + 1}`} // Unique alt text to avoid warnings
                    className="w-full object-cover"
                    width={200}
                    height={100} // adjust based on actual image
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </Container>
    </div>
  );
};

export default OurClients;
