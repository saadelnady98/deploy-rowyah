"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import Logo from "@/public/Ruw.png";
import arrowLeft from "@/public/images/ourProjects/arrow-left-white.svg";
// import close from "@/public/images/navBar/close.svg";
import arrowClose from "@/public/Close.svg";
import Language from "@/components/shared/navbar/Language";
import background from "@/public/images/navBar/bg.png";
import subtract from "@/public/images/navBar/Subtract.svg";

import { useLocale, useTranslations } from "next-intl";
import RequestServiceHomeForm from "@/components/homePage/RequestServiceHomeForm";
import Success from "@/components/Success";
import { ServiceItem } from "./Navbar";

type NavItem = {
  name: string;
  path?: string;
  children?: NavItem[];
  data?: ServiceItem[];
};

const AsideBar = ({
  open,
  setOpen,
  items,
  data
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: NavItem[];
  data?: ServiceItem[];
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const locale = useLocale()
  const t = useTranslations("home");
  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <section>
      <div
        className={`fixed bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] top-0 left-0 w-screen h-svh z-[100] transition-transform duration-1000 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className={` absolute top-[142px] z-0 ${locale === "ar" ? "left-0" : "right-0 "} `}>
          <Image src={Logo} alt="background" width={290} height={412} className="pointer-events-none select-none" />
        </div>
        <div className="absolute top-3 left-0 px-8 w-full ">
          <div className="flex justify-between items-center">
            <Image src={Logo} alt="Logo" className="w-[200px]  " />
            <button onClick={() => setOpen(false)}>
              <Image src={arrowClose} alt="close" className="w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full px-8 h-full pt-[110px]">
          <ul className="flex flex-col gap-5 w-full mt-10">
            {items.map((item, i) => (
              <li
                key={item.name}
                className={`w-full transition-transform duration-1000 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex gap-3 w-full"
                    >
                      <div className="px-1 border border-white rounded-full flex justify-center items-center">
                        <Image
                          src={arrowLeft}
                          alt={arrowLeft}
                          className={`w-4 ${openDropdown === item.name
                              ? "rotate-90 duration-300"
                              : ""
                            }`}
                        />
                      </div>
                      <span className=" text-white text-xl  font-normal flex justify-center items-center">
                        {item.name}
                      </span>
                    </button>

                    {openDropdown === item.name && item.children?.length > 0 && (
                      <div className="flex flex-col gap-4 py-3 px-11 transition-all duration-500">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.path ?? "#"}
                            className="block text-white text-md"
                            onClick={() => setOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || "#"}
                    className=" w-full"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex gap-3 ">
                      <div className="px-1 border border-white rounded-full flex justify-center items-center">
                        <Image
                          src={arrowLeft}
                          alt={arrowLeft}
                          className="w-4"
                        />
                      </div>

                      <span className="text-white font-normal text-xl">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
            ))}
            <li>
              <div className="flex flex-row gap-3 h-7 ">
                <div className="px-1 border border-white rounded-full flex justify-center items-center">
                  <Image src={arrowLeft} alt={arrowLeft} className="w-4" />
                </div>
                <Language mobile className="font-normal text-xl flex text-white !border-none" />
              </div>
            </li>
          </ul>
          <div className="flex flex-row justify-center items-center gap-4 py-5 w-full mt-auto z-10">
            <Link
              href={`/${locale}/contact-us`}
              onClick={() => setOpen(false)}
              className="w-[50%] flex items-center justify-center text-center text-[16px] bg-[#092D42] font-bold text-white py-3 sm:py-4 px-0 rounded-lg hover:bg-white hover:text-[var(--primary-color)] transition-all duration-300 bg-opacity-100"
            >
              {" "}
              {t("hero.button")}
            </Link>

            <button
              onClick={() => {
                setOpen(false)
                setOpenForm(true);
              }}
              className="w-[50%] flex items-center justify-center text-center text-[16px] bg-[#092D42] font-bold text-white py-3 sm:py-4 px-0 rounded-lg hover:bg-white hover:text-[var(--primary-color)] transition-all duration-300 bg-opacity-100"
            >
              {" "}
              {t("hero.button2")}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10 px-5"
          onClick={() => setOpen(false)}
        />
      )}
      {openForm ? (
        <RequestServiceHomeForm
          locale={locale}
          className="w-fit bg-white rounded-3xl"
          data-aos="fade-right"
          setOpenForm={setOpenForm}
          visible={openForm}
          setShowSuccessModal={setShowSuccessModal} // <- pass this down
        />
      ) : showSuccessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Success />
        </div>
      ) : null}
    </section>
  );
};

export default AsideBar;
