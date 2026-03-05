"use client";

import { useState, useTransition } from "react";
import { Link } from "../../../../routing";
import Image from "next/image";
import Logo from "@/public/Ruw.png";
import { Icon } from "@iconify-icon/react";
import { usePathname } from "next/navigation";
import AsideBar from "./AsideBar";
import Container from "@/components/reusableComponent/Container";
import { useLocale, useTranslations } from "next-intl";
import Language from "@/components/shared/navbar/Language";
import menu from "@/public/images/navBar/Menu.svg";

type NavItem = {
  name: string;
  path?: string;
  children?:  any;

};

 export type ServiceItem = {
  title: string;
  slug: string;
};
const Navbar = ({ data }: { data: ServiceItem[]}) => {
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] =  useState<string | null>(null);

const toggleDropdown = (name :  any) => {
  setDropdownOpen(name);
};
const t = useTranslations("navbar");

const serviceChildren = data?.map((item ) => ({
  name: item?.title ?? "Unknown Service",
  path: `/${locale}/services/${item.slug}`,
}));
 
  const navItems: NavItem[] = [
    { name: t("homeLink"), path:  `/`},
      {
        name: t("services.title"), 
        children: serviceChildren, // ✅ Pass actual array of children
      },
      { name: t("ourPortfolio"), path: `/projects`  },
      { name: t("aboutUs"), path: `/about-us`  },
      { name: t("blogs"), path: `/blogs` },
      { name: t("contactUs"), path: `/contact-us`  },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
  // For home link, match exactly
  if (path === `/${locale}` || path === `/`) {
    return pathname === `/${locale}`;
  }

  // For other paths, allow exact or nested match
  return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <AsideBar
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        items={navItems}
        data={data}
      />

      <nav
        className="bg-white sticky z-50"
        data-aos="fade-down"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <Container>
          <div className="flex justify-between items-center ">
            {/* Logo */}
            <Link href="/" className="relative w-[160px] h-[70px]">
              <Image src={Logo} alt="Logo" fill className="object-contain w-full h-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center lg:gap-10 md:gap-5">
              {navItems.map((item) => (
                <div key={item.name} className="relative group text-[16px]">
                  {item.children ? (
                    <div   
                    onMouseEnter={() => toggleDropdown(item.name)}
                    onMouseLeave={() => toggleDropdown(null)}>
                      <button
                        className={`flex items-center gap-0 px-3 py-2 transition-colors group ${
                          isActive(item.path)
                            ? "text-[#2F7D8F] font-bold"
                            : "text-[#252525] "
                        }`}
                      >
                        {item.name}
                        <Icon
                          icon="iconamoon:arrow-down-2-thin"
                          className={`text-[#252525] text-lg p-0 hover:text-[var(--primary-color)] ${
                            isActive()
                              ? "text-[#2F7D8F] font-medium"
                              : "text-[#252525] "
                          }`}
                        />
                      </button>

                      {item.children && dropdownOpen === item.name &&(
                        <div className="absolute top-full w-[250px] shadow-[0px_0px_20px_0px_rgba(156,156,156,0.18)] bg-white rounded-lg py-2 z-50 ">
                          {data?.map((child : any) => (
                            <Link
                              key={child.title}
                              href={
                                child?.slug ? `/services/${child.slug}` : "#"
                              }
                              className={`block mx-3 py-2 border-b border-[#D8D8D8] last:border-b-0 hover:scale-[1.03] hover:text-[var(--primary-color)] transition-transform duration-300 ${
                                isActive(child.path)
                                  ? "text-[#2F7D8F] font-medium"
                                  : "text-[#252525] "
                              }`}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path || "/"}
                      className={` py-2 transition-colors text-[16px] hover:text-[var(--primary-color)] ${
                        isActive(item.path)
                          ? "text-[#2F7D8F] font-bold border-b-2 border-[#2F7D8F]"
                          : "text-[#252525] "
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Language className="px-0 hidden lg:flex text-[#252525] items-center justify-center" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Image
                src={menu}
                alt="Menu"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </button>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
