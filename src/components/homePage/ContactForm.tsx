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

const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  captchaToken: z.string().min(1, "Please verify you are not a robot"),
  message: z.string().optional(),
});

const withMessageSchema = baseSchema.extend({
  message: z.string().min(1, "Message is required"),
});

const getFormSchema = (withMessage: boolean) => {
  return withMessage ? withMessageSchema : baseSchema;
};

// FormData type will be defined dynamically based on the schema

// interface ContactFormProps {
//   translations: any;
// }

// const ContactForm: React.FC<ContactFormProps> = () => {

const ContactForm = ({
  btnAlignEnd,
  withMessage,
}: {
  btnAlignEnd?: boolean;
  withMessage?: boolean;
}) => {

  
  const t = useTranslations("ContactUsSection");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Dynamically set the form schema based on withMessage prop
  const formSchema = getFormSchema(!!withMessage);
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    control,
    watch,
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
      captchaToken: "",
      ...(withMessage ? { message: "" } : {}),
    },
  });

  const { mutate, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: (data) =>
      apiServiceCall({ url: "contacts", body: data, method: "POST" }),
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

  const onSubmit = (data: any) => {
    // Handle form submission
    // If withMessage is false, remove message field from data
    // This ensures message is not sent to backend when not needed
    const submissionData = !withMessage && data.message
      ? { ...data, message: undefined }
      : data;
      
    mutate(submissionData);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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

      {withMessage && errors?.message && (
        <p className="text-red-500 text-sm mt-1">{String(errors?.message?.message)}</p>
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

export default ContactForm;
