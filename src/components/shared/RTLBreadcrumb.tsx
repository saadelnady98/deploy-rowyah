import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface RTLBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function RTLBreadcrumb({ items, className }: RTLBreadcrumbProps) {
  return (
    <nav
      className={cn("flex justify-center w-full mb-10 px-2", className)}
      aria-label="Breadcrumb"
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-delay="300"
    >
      <ol className="flex items-center justify-center flex-wrap gap-y-2 w-full max-w-full overflow-x-auto px-3 py-1.5 rounded-md">
        {items.map((item, index) => {
          // Check if this is the last item (active tab)
          const isLastItem = index === items.length - 1;
          
          return (
            <li
              key={item.href}
              className="flex items-center"
            >
              {index !== 0 && <span className="mx-1 md:mx-2 text-sm text-gray-500">/</span>}
              <div
                className={`flex items-cente r px-1 sm:px-2 py-1 rounded-[4px] transition-opacity duration-200 hover:bg-[#2F7D8F1F] ${
                  isLastItem
                    ? "bg-[#2F7D8F1F] bg-opacity-[0.12] font-medium " 
                    : "bg-[#2F7D8F0F] bg-opacity-[0.6] font-normal text-[14px]"
                }`}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-xs sm:text-sm font-medium hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[180px] md:max-w-none",
                    isLastItem 
                      ? "text-[#2F7D8F]  cursor-default text-[14px]" 
                      : "text-[#2F7D8F]  text-[14px]"
                  )}
                  aria-current={isLastItem ? "page" : undefined}
                  title={item.label}
                >
                  {item.label}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}