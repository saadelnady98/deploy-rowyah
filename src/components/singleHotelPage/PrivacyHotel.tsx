import React from "react";
import Container from "../reusableComponent/Container";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import location from "@/public/loacation.svg";

const PrivacyHotel = async ({ data }: any) => {
  const t = await getTranslations("PrivacyHotel");
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <span className="text-white text-[24px] font-medium">{t("title")}</span>
        <div className="text-white text-[20px] font-normal ">
          {data?.content}
        </div>
      </div>
    </Container>
  );
};

export default PrivacyHotel;
