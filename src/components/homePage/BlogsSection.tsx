"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/reusableComponent/Container";
import Link from "next/link";
import defaultimg from "@/public/defaultimg.png";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Pagination from "../reusableComponent/Pagination";

interface BlogsSectionProps {
  data: any[];
  withoutShowMore?: boolean;
  withoutHeaderDescription?: boolean;
  className?: string;
  locale?: string;
}

const BlogsSection = ({
  data,
  locale,
  withoutShowMore,
  withoutHeaderDescription,
  className,
}: BlogsSectionProps) => {
  const t = useTranslations("BlogsSection");
      const [currentPage, setCurrentPage] = useState(1);
      const blogsPerPage = 6;
      const paginatedProjects = data.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
      );
      useEffect(() => {
        setCurrentPage(1); // Reset on tab/singleProject change
      }, [data]);

  return (
    <section className={cn("w-full", className)}>
      <Container>
        <div data-aos="fade-up" data-aos-delay="500">
          {/* Blogs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 2xl:gap-6 mt-10">
            {paginatedProjects?.map((blog) => {
              const cleanDescription = blog?.description?.replace(/<img[^>]*>/g, "");

              return (
                <Link
                  href={`/${locale}/blogs/${blog?.category_slug}/${blog?.slug}`}
                  key={blog?.id}
                  className="relative w-full lg:h-[499px] 2xl:h-[599px] group"
                >
                  <div className="inset-0 bg-white/5 border border-white/20 rounded-[24px] lg:h-full mb-6 lg:mb-7 xl:mb-10">
                    <div className="flex flex-col h-full">
                      <div className="relative w-full h-[200px] lg:h-[268px] mb-6">
                        <Image
                          src={blog?.image?.original_url || defaultimg}
                          alt="Blog"
                          className="object-cover rounded-[24px] border border-white/20 w-full h-full"
                          width={400}
                          height={230}
                        />
                      </div>
                     
                      <Link href={`/${locale}/blogs/${blog?.category_slug}`} className="font-bold text-[16px] mb-4 text-[var(--primary-color)]">
                        {blog?.category_name}
                      </Link>
                     
                     
                      <div className="flex flex-col">
                        <Link  href={`/${locale}/blogs/${blog?.category_slug}/${blog?.slug}`} className="text-[16px] lg:text-xl xl:text-2xl font-bold mb-4 line-clamp-2">
                          {blog?.title}
                        </Link>
                        <p
                          className="mb-4 text-[14px] lg:text-[16px] line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: cleanDescription }}
                        />
                        <span className="text-[#252525] text-[16px] font-bold">
                          {blog?.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {data.length > blogsPerPage && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(data.length / blogsPerPage)}
                  onPageChange={setCurrentPage}
                />
                </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default BlogsSection;
