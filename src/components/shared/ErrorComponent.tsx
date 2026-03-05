import Image from "next/image";

const ErrorComponent = ({
  title,
  des,
  img,
}: {
  title: string;
  des: string;
  img: any;
}) => {
  return (
    <div className="flex flex-col justify-center items-center mb-[18px]">
      <Image src={img} className="w-[260px] lg:w-[338px] h-[197]" alt="img" />
      <p className="text-[var(--primary-color)] text-lg md:text-xl lg:text-[24px] font-bold mt-[38px] mb-5">{title}</p>
      <p className="text-[#473954] text-[16px] md:text-lg lg:text-xl font-normal w-[448px] text-center">{des}</p>
    </div>
  );
};
export default ErrorComponent;
