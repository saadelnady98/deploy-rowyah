import Image from "next/image";
import React from "react";
import icon from "@/public/images/ourProjects/Group 481991.svg";
import icon2 from "@/public/images/ourProjects/Group 481949.svg";
import Container from "../reusableComponent/Container";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { getTranslations } from "next-intl/server";

const projectSteps = async ({ data }: { data: any }) => {
  const t = await getTranslations("singleProject");
  return (
    <Container>
      <section>
        <h2
          className="text-center text-[32px] font-bold text-[var(--primary-color)] mb-12"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
        >
          {" "}
          {t("project_steps")}
        </h2>

        <div
          className="flex flex-row flex-wrap gap-8 lg:gap-[5%] w-full justify-center items-center"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
        >
          {data?.map((item : any , index :number) => (
            <div  key={index} className="flex flex-col justify-center items-center text-center w-full md:w-1/3 lg:w-1/4 2xl:w-1/5 mb-5"   >
              <div className="flex flex-col gap-2 items-center">
                <div className="bg-[linear-gradient(to_left,_#195368_0%,_#092D42_100%)] w-[80px] h-[80px] rounded-full flex items-center justify-center">
                  <div className="w-[66px] h-[66px] rounded-full bg-gradient-to-r from-[#2F7D8F]/30 to-transparent flex items-center justify-center">
                    <Image
                      src={item?.image?.original_url || defaultImg}
                      alt="icon"
                      width={80}
                      height={80}
                      className="flex justify-center items-center w-[42px] h-[42px]"
                    />
                  </div>
                </div>
   
                <Image
                  src={icon2}
                  alt="icon"
                  width={10}
                  height={81}
                  className="text-center"
                />
                <span className="text-[var(--primary-color)] text-xl font-bold">
                  {" "}
                  {item?.title}
                </span>
              </div>
              <p className="text-[#473954] font-normal text-lg text-center line-clamp-3">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default projectSteps;
