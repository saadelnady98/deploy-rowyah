"use client";
import Image from "next/image";
import useCurrentLang from "@/hooks/useCurrentLang";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import lang1 from "@/public/images/languages/Clip path group (1).svg";
import lang2 from "@/public/images/languages/United Kingdom (GB).svg";

const Language = ({ className ,mobile}: { className?: string  ; mobile?: boolean}) => {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const { lang } = useCurrentLang();

  const currentLang = {
    code: lang,
    name: lang === "en" ? "English" : "Arabic",
    flag: lang === "en" ? lang2 : lang1,
    href: `/${lang}${pathname.replace(/^\/(en|ar)/, "")}`
  };

  const otherLang = {
    code: lang === "en" ? "ar" : "en",
    name: lang === "en" ? "Arabic" : "English",
    flag: lang === "en" ? lang1 : lang2,
    href: `/${lang === "en" ? "ar" : "en"}${pathname.replace(/^\/(en|ar)/, "")}`
  };

  return (
    <div className={cn("relative group overflow-hidden w-[100px] h-[33px] px-3 py-[5px] border rounded-[3px]", className)}>
    {/* Current Language Display */}
    <div className="flex items-center gap-2 cursor-pointer transition-all duration-700 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
      <span className={`text-[16px] font-medium ${mobile ? "text-white" : "text-[var(--dark-color)]"} `}>{currentLang.name}</span>
      <Image 
        src={currentLang.flag} 
        alt={currentLang.name} 
        width={20} 
        height={20}
        className=" w-[22px] h-[17px]"
      />
    </div>

    {/* Other Language Option (Slides in from left) */}
    <a
      href={otherLang.href}
      className="absolute flex items-center text-center my-auto gap-2 transition-all duration-700 ease-in-out transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <span className={`text-[16px] font-medium ${mobile ? "text-white" : "text-[var(--dark-color)]"} `}>{otherLang.name}</span>
      <Image 
        src={otherLang.flag} 
        alt={otherLang.name} 
        width={20} 
        height={20}
        className="w-[22px] h-[17px]"
      />
    </a>
  </div>
  );
};

export default Language;