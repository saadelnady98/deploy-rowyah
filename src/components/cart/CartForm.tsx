"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/ui/CustomInput";
import MainLink from "@/components/reusableComponent/MainLink";
import { useTranslations } from "next-intl";
import CostumPhoneInput from "@/components/reusableComponent/PhoneInput";
import MainButton from "@/components/reusableComponent/MainButton";
import { useMutation } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import CustomTextarea from "../ui/CustomTextarea";
// import ReCAPTCHA from "react-google-recaptcha";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
  captchaToken: z.string().min(1, "Please verify you are not a robot"),
});

type FormData = z.infer<typeof formSchema>;

// interface CartFormProps {
//   translations: any;
// }

// const CartForm: React.FC<CartFormProps> = () => {

const CartForm = ({
  btnAlignEnd,
  withMessage,
}: {
  btnAlignEnd?: boolean;
  withMessage?: boolean;
}) => {
  const t = useTranslations("Cart");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      captchaToken: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: (data) =>
      apiServiceCall({ url: "cart/checkout", body: data, method: "POST" }),
    onSuccess: () => {
      console.log("successxzczxc");
    },
    onError: (error) => {
      console.log("errordsadasdsad", error?.message);
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setValue("captchaToken", token);
      clearErrors("captchaToken");
      setCaptchaToken(token);
    } else {
      setError("captchaToken", {
        type: "manual",
        message: "Please verify you are not a robot",
      });
      setCaptchaToken(null);
    }
  };

  const onSubmit = (data: FormData) => {

    const cartLocalStorage = localStorage.getItem("cart");
    let room_reservations = [];
    if (cartLocalStorage) {
      room_reservations = JSON.parse(cartLocalStorage)?.map((item : any) => ({
        room_id: item?.id,
        checkin_date: item?.checkin_date,
        checkout_date: item?.checkout_date,
        adults: item?.adults,
        ages: item?.ages?.length,
      }));
    }

    const formData = new FormData();
    formData.append("name", `${data.firstName} ${data.lastName}`);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    // room_reservations.forEach((reservation: {
    //   room_id: number | string;
    //   checkin_date: string;
    //   checkout_date: string;
    //   adults: number | string;
    //   ages: number | string;
    // }, index: number) => {
    //   formData.append(`room_reservations[${index}][room_id]`, reservation.room_id.toString());
    //   formData.append(`room_reservations[${index}][checkin_date]`, reservation.checkin_date);
    //   formData.append(`room_reservations[${index}][checkout_date]`, reservation.checkout_date);
    //   formData.append(`room_reservations[${index}][adults]`, reservation.adults.toString());
    //   formData.append(`room_reservations[${index}][ages]`, reservation.ages.toString());
    // });

    room_reservations.forEach(
      (
        reservation: {
          room_id: number | string;
          checkin_date: string;
          checkout_date: string;
          adults: number | string;
          ages: number | string;
        },
        index: number
      ) => {
        formData.append(
          `room_reservations[${index}][room_id]`,
          reservation.room_id.toString()
        );
        formData.append(
          `room_reservations[${index}][checkin_date]`,
          reservation.checkin_date.toString().split("T")[0]
        );
        formData.append(
          `room_reservations[${index}][checkout_date]`,
          reservation.checkout_date.toString().split("T")[0]
        );
        formData.append(
          `room_reservations[${index}][adults]`,
          reservation.adults.toString()
        );
        formData.append(
          `room_reservations[${index}][ages]`,
          reservation.ages.toString()
        );
      }
    );


    mutate(formData as any);
  };

  return (
    <form
      className="w-full bg-white bg-opacity-5 p-4 rounded-3xl border border-[#FFFFFF33]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-medium mb-5">{t("form_title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label={t("first_name")}
          name="firstName"
          placeholder=""
          register={register}
          error={errors.firstName?.message}
        />
        <CustomInput
          label={t("last_name")}
          name="lastName"
          placeholder=""
          register={register}
          error={errors.lastName?.message}
        />
      </div>

      <CustomInput
        label={t("email")}
        name="email"
        type="email"
        placeholder=""
        register={register}
        error={errors.email?.message}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{ required: t("phone_required") }}
        render={({ field }) => (
          <CostumPhoneInput
            className="mt-5"
            label={t("phone_number")}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}

      {withMessage && (
        <CustomTextarea
          label={t("message")}
          name="message"
          placeholder=""
          register={register}
          error={errors.message?.message}
        />
      )}

      {/* <CustomInput
        label={t("phone_number")}
        name="phone"
        type="tel"
        placeholder=""
        register={register}
        error={errors.phone?.message}
        icon={
          <>
            <div className="w-px h-6 bg-white opacity-60"></div>
            <img src="/sa-flag.png" alt="Saudi Flag" className="w-6 h-5" />
          </>
        }
      /> */}

      {errors?.message && (
        <p className="text-red-500 text-sm mt-1">{errors?.message?.message}</p>
      )}

      {/* <div className="my-5">
        <ReCAPTCHA
          sitekey="YOUR_SITE_KEY_HERE" // Replace with your actual site key
          onChange={handleCaptchaChange}
        />
        {errors.captchaToken && (
          <p className="text-red-500 text-sm mt-1">
            {errors.captchaToken.message}
          </p>
        )}
      </div> */}

      {isError && error && (
        <p className="text-red-500 text-sm mt-1">
          {error?.message || "something went round please try again"}
        </p>
      )}

      {isSuccess && (
        <p className="text-green-500 text-sm mt-1">{"sent success"}</p>
      )}

      {/* Button */}
      <div
        className={`mt-7 lg:mt-10 w-full flex items-center ${
          btnAlignEnd ? "justify-end" : "justify-center"
        }`}
      >
        <MainButton
          className={btnAlignEnd ? "w-fit" : "w-full"}
          type="submit"
          styleMe
          // disabled={isPending || !captchaToken}
        >
          {isPending ? t("sending") : t("send")}
        </MainButton>
      </div>
    </form>
  );
};

export default CartForm;
