"use client";
import Image from "next/image";
import React from "react";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import image from "@/public/images/aboutUs/Checkmark.svg";

interface ValueItemProps {
  title: string;
  description: string;
  image: string;
}

const ValueItem: React.FC<ValueItemProps> = ({ title, description, image }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-start gap-2 mb-2 flex-row-reverse ">
        <h3 className="text-[#2F7D8F] text-xl font-semibold">{title}</h3>
        <div className="w-10 h-10 relative flex items-center justify-center">
          <div className="w-full h-full">
            <Image src={image} alt="right" width={30} height={30} />
            {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="3" x="5" y="5" fill="#52B2B3" fillOpacity="0.15" />
              <path d="M35 10.0264L17.5 25.0334L5 17.5299" stroke="#52B2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> */}
          </div>
        </div>
      </div>
      <p className="text-[#47394F] leading-6">{description}</p>
    </div>
  );
};

function OurValues({ data }: { data: any }) {
  return (
    <div
      className=""
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
      <div className="text-center mb-12">
        <h2 className="text-[#2F7D8F] text-3xl font-bold mb-4 mt-[72px] md:mt-0">
          {data?.our_value?.title}
        </h2>
        <p className="text-[#47394F] text-lg max-w-4xl mx-auto">
          {data?.our_value?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10">
        {data?.values?.map((item : any, index : number) => (
          <div key={index}>
            <ValueItem
              image={image}
              title={item?.name || " "}
              description={item?.description || " "}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurValues;
