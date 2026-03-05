'use client'
import Image from "next/image";
import defaultimg from "@/public/defaultimg.png";
import { Typewriter } from 'react-simple-typewriter'

interface BannerProps {
  img: any;
  title?: string;
  subTitle?: string;
  description?: string;
  withoutShadow?: boolean;
  className?: string;
  classNameWrapper?: string;
  words?:Array<string>;
}

const Banner = ({
  img,
  title,
  subTitle,
  description,
  withoutShadow,
  className,
  classNameWrapper,
  words,
}: BannerProps) => {

  return (
    <div
      className={`relative flex justify-center w-full ${
        classNameWrapper && classNameWrapper
      }`}

       data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
    >
      <div
        className={`relative w-full h-[432px] sm:h-[432px] md:h-[450px] lg:h-[500px] xl:h-[523px] overflow-hidden rounded-[16px] ${
          className && className
        }`}
      >
        {" "}
        <div
          className={`layer absolute top-0 right-0 left-0 bottom-0 ${
            withoutShadow ? "" : "bg-[rgba(0,0,0,0.4)"
          } `}
        />
        <Image
          src={img || defaultimg}
          alt="blog"
          width={1200}
          height={1000}
          className="w-full h-full object-cover rounded-lg"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 lg:gap-6 rounded-lg py-[64px] px-[16px] "
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-white text-xl md:text-[30px] lg:text-[40px] mt-[109px] md:mt-[147px] font-bold">{title} </h2>
          {subTitle && <p className="my-4 text-[#52B2B3] text-lg md:text-xl lg:text-2xl font-bold">{subTitle} 
            {words && <Typewriter  words={words || []}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1000}
            >
             </Typewriter>}
           </p>}
          <p className="max-w-[930px] text-white tetx-[14px] md:text-[16px] lg:text-[18px] font-normal text-center w-200 mb-[88px] md:mb-[160px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Banner;
