"use client";
import useCurrentLang from "@/hooks/useCurrentLang";
import Link from "next/link";

interface MainLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  styleMe?: boolean;
}

const MainLink = (params: MainLinkProps) => {
  // import { useRouter } from "next/router"
  const { lang } = useCurrentLang();

  const { href, children, className } = params;

  // bg-white text-[#CAB16C]
  // hover:bg-gradient-to-t from-[#99803B] to-[#CAB16C]
  // hover:text-white duration-300
  // cursor-pointer

  return (
    <Link
      href={`/${lang}/${href}`}
      className={`inline-block ${className} ${
        params?.styleMe
          ? "inline-flex items-center max-lg:text-[14px] font-bold justify-center h-[48px] px-5 lg:px-9 bg-[var(--primary-color)] text-white rounded-[8px] hover:bg-white hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-colors"
          : ""
      } `}
    >
      {children}
    </Link>
  );
  //   return (
  //     <Link
  //       href={`/${lang}/${href}`}
  //       className={`text-white inline-block ${className} ${
  //         params?.styleMe
  //           ? "hover:!bg-transparent hover:!bg-none hover:text-primary hover:!border-primary border duration-500"
  //           : ""
  //       } `}
  //     >
  //       {children}
  //     </Link>
  //   );
};

export default MainLink;
