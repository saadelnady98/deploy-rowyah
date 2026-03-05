"use client";
// SingleProject.tsx (Server Component)
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import defaultImg from "@/public/images/navBar/Mask group.svg";
import arrowLeftWhite from "@/public/images/ourProjects/arrow-left-white.svg";
import arrowLeft from "@/public/images/ourProjects/arrow-left.svg";
import { useLocale, useTranslations } from "next-intl";
import Container from "../reusableComponent/Container";
import Link from "next/link";

const SingleProject = ({ data }: { data: any }) => {
  const locale = useLocale();
  const t = useTranslations("home.projects");
  return (
    <Container>
      <section data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
        <div className="flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-20 px-4 lg:px-0">
          <div className=" w-full lg:w-[60%] h-[300px] lg:h-[421px] transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src={data?.data?.image?.original_url || defaultImg}
              alt={data?.data?.name || "image"}
              width={1000}
              height={600}
              className="mx-auto w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col items-start gap-6 my-auto">
            <h3 className="text-xl md:text-xl xl:text-[28px] font-bold text-[var(--primary-color)] transition-transform duration-500 hover:scale-[1.02]">
              {data?.data?.name}
            </h3>

            <div className="flex flex-row gap-24 md:gap-36">
              <p className="text-[14px] lg:text-[18px]  font-medium text-[var(--dark-color)]  transition-transform duration-500 hover:scale-[1.02]">
                {t("country")} <br />
                <span className="text-[var(--primary-color)] text-[16px] lg:text-lg font-medium transition-transform duration-500 hover:scale-[1.02] ">
                  {data?.data?.country?.name}
                </span>
              </p>

              {data?.data?.technologies?.length > 0 && (
                <p className="text-[14px] lg:text-[18px]  font-medium text-[var(--dark-color)] transition-transform duration-500 hover:scale-[1.02] ">
                  {t("technologies")} <br />
                  <span className="text-[var(--primary-color)] text-[16px] lg:text-lg font-medium transition-transform duration-500 hover:scale-[1.02] ">
                    {data?.data?.technologies
                      .map((item: any) => item.name)
                      .join(", ")}
                  </span>
                </p>
              )}
            </div>

            <p className="border-t border-t-[var(--primary-color)] pt-6 text-[14px] lg:text-[18px] font-normal text-[var(--dark-color)] transition-transform duration-500 hover:scale-[1.02]">
              {data?.data?.short_description}
            </p>

            <div className="w-full flex justify-center lg:justify-start group">
              {data?.data?.project_url && (
                <Link
                  target="_blank"
                  href={data.data.project_url || `/${locale}`}
                  className="group flex justify-center gap-1.5 bg-[var(--primary-color)] text-[14px] text-white py-3 sm:py-4 px-5 xl:px-[24px] lg:px-6 sm:px-15 w-full lg:w-[190px] rounded-lg hover:bg-white hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all duration-300 transition-transform duration-500 hover:scale-[1.02]"
                >
                  {t("button")}
                  <Image
                    src={arrowLeftWhite}
                    alt="arrow left"
                    className={`group-hover:hidden block text-[14px] ${
                      locale === "ar" ? "rotate-0" : "rotate-180"
                    }`}
                  />
                  <Image
                    src={arrowLeft}
                    alt="arrow left white"
                    className={`hidden group-hover:block text-[14px] ${
                      locale === "ar" ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default SingleProject;
