import img2 from "@/public/Bag.svg";
import Image from "next/image";

import title from "@/public/title.svg";
import SectionTitle from "../reusableComponent/SectionTitle";
import image from "@/public/images/aboutUs/image.svg"
import eye from "@/public/images/aboutUs/eye.svg"
import frame from "@/public/images/aboutUs/Frame 74.svg"
import defaultImg from "@/public/images/navBar/Mask group.svg";
import { getLocale } from "next-intl/server";


const OurVision = async({ data, className }: { data: any; className?: string }) => {
  const  locale  = await getLocale();
    const isRTL = locale === 'ar';
   return (
    <div
    className={`relative w-full !h-[85%] team-gradient-bg overflow-hidden ${isRTL ? 'team-gradient-bg' : 'ltr-gradient'}`}
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    {/* ✅ Frame Image Positioned Based on Direction */}
    <Image
      src={frame}
      alt="frame"
      width={1000}
      height={500}
      className={`absolute top-[270px] sm:top-[190px] md:top-[0px] lg:top-[0px] xl:top-[10px] w-[500px] md:w-[350px] lg:w-[470px] xl:w-[630px] xxl:w-[830px] h-[227px] ${
        isRTL ? 'left-[0px]  ' : 'right-[0px] !rotate-180 transform'
      }`}
      data-aos="fade-up"
      data-aos-duration="1000"
    />
  
    {/* ✅ Flex direction reversed in RTL */}
    <div
      className={` flex flex-col-reverse gap-10 text-white py-10 md:py-20 lg:py-40 xl:py-52 px-4 lg:px-11 justify-center items-center w-full h-full  ${
        isRTL ? 'md:!flex-row' : 'md:!flex-row'
      }`}
    >
      {/* ✅ Image Section */}
      <div className="h-[400px] md:h-[400px] lg:h-[520px] xl:h-[520px] w-full md:w-[516px] ">
        <Image
          src={data?.image?.original_url || defaultImg}
          className="w-full h-full object-cover "
          alt="img2"
          width={1000}
          height={600}
          data-aos="fade-up"
          data-aos-duration="1000"
        />
      </div>
  
      {/* ✅ Text Section */}
      <div className="w-full lg:w-[70%] pt-10 mt-1 sm:pt-0 sm:mt-0">
        <div className="w-full ">
          <h2
            className={`text-xl lg:text-[28px] xxl:text-[32px] font-bold mb-4 lg:mb-6 ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            <Image
              src={eye}
              alt="eye"
              width={36}
              height={36}
              className={`inline ${isRTL ? 'ml-3' : 'mr-3'}`}
            />
            {data?.title}
          </h2>
          <span
            className={`text-[14px] lg:text-[22px] xxl:text-2xl font-normal ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            {data?.description}
          </span>
        </div>
      </div>
    </div>
  </div>
  
  );
};
export default OurVision;
