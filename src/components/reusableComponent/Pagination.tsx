"use client";
import { useTranslations } from "next-intl";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const t = useTranslations("Pagination");
  const generatePages = () => {
    const pages: (number | string)[] = [];

    // Always show first 3 pages if currentPage is close
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 4) {
        pages.push("...");
        pages.push(totalPages);
      } else if (totalPages === 4) {
        pages.push(4);
      }
    }
    // In the middle
    else if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
    // Near the end
    else {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10 ">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`font-bold ${
          currentPage === 1
            ? " cursor-not-allowed text-[#B6B6B6] "
            : " text-[#252525] hover:text-[var(--primary-color)]"
        }`}
      >
        {t("previous")}
      </button>

      {/* Page numbers */}
      {generatePages().map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(Number(item))}
            className={`px-3 py-[7px] w-8 h-8 text-[13px] font-semibold rounded-[5px] flex items-center justify-center ${
              currentPage === item
                ? "bg-[#2F7D8F] text-white"
                : "bg-white border text-[#252525] border-[#E7E7E7]"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={` font-bold ${
          currentPage === totalPages
            ? " cursor-not-allowed text-[#B6B6B6] "
            : "text-[#252525] hover:text-[var(--primary-color)]"
        }`}
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
