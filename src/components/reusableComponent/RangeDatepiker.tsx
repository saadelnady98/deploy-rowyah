"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ar, enUS } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import calendar2 from "@/public/calendar2.svg";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";
import users from "@/public/users.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function DatePickerWithRange({
  className,

  control,
  lang,
  watch,
}: {
  watch: any;
  control: any;
  lang: string;
  className?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const today = new Date();
  const t = useTranslations("filter");

  return (
    <div className={cn("grid gap-2 w-full  m-auto ", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start border-none  py-[30px] bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] hover:text-white rounded-[12px] text-white  text-left font-normal",
              !watch("date") && ""
            )}
            // className={cn(
            //   "w-full justify-start border-none  py-[30px] bg-[#FFFFFF1A] hover:bg-[#FFFFFF1A] hover:text-white rounded-[12px] text-white  text-left font-normal",
            //   !watch("date") && "text-muted-foreground"
            // )}
          >
            <Image src={calendar2} alt="users" className="w-5 h-5" />

            {watch("date")?.from ? (
              watch("date").to ? (
                <>
                  {format(watch("date").from, "LLL dd")} -{" "}
                  {format(watch("date").to, "LLL dd")}
                </>
              ) : (
                format(watch("date").from, "LLL dd")
              )
            ) : (
              <span>{t("select_date")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 mt-2 bg-[#00000025] backdrop-blur-lg text-white z-[9999]"
          align="start"
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                initialFocus
                mode="range"
                dir="ltr"
                locale={lang === "ar" ? ar : enUS}
                defaultMonth={new Date()}
                selected={watch("date")}
                onSelect={field.onChange}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                className="text-white w-full"
              />
            )}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
