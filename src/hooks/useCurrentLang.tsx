"use client";
import { usePathname } from "next/navigation";

const useCurrentLang = () => {
  const pathname = usePathname();
  const lang: "ar" | "en" = pathname.split("/")[1] as "ar" | "en";

  return { lang };
};

export default useCurrentLang;
