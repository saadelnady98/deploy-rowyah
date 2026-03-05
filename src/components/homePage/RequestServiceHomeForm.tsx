"use client";
import CostumPhoneInput from "@/components/reusableComponent/PhoneInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextarea from "@/components/ui/CustomTextarea";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";
import Select from "react-select";
import close from "@/public/images/heroSection/Vector.svg";
import Image from "next/image";
import rocket from "@/public/images/services/Rocket.svg";
import rocket2 from "@/public/images/services/Rocke2t.svg";
// import ReCAPTCHA from "react-google-recaptcha";
import { Dispatch, SetStateAction } from "react";
type ApiError = {
  errors?: {
    message?: string;
  };
};

export interface ContactFormProps {
  locale: string;
  className?: string;
  description?: string;
  visible: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
}
const formSchema = z.object({
  fullName: z.string().min(1, "full name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
  services: z.any(),
  // captchaToken: z.string().min(1, "Please verify you are not a robot"),
});

type FormData = z.infer<typeof formSchema>;

const RequestServiceHomeForm: React.FC<ContactFormProps> = ({
  className,
  description,
  locale,
  setOpenForm,
  visible,
  setShowSuccessModal,
}) => {
  const t = useTranslations("contact.heroForm");
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
      fullName: "",
      email: "",
      phone: "",
      message: "",
      services: [],
      // captchaToken: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: (data) =>
      apiServiceCall({ url: "quota", body: data, method: "POST" }),
    onSuccess: () => {
      setOpenForm(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
    },
    onError: (error) => {
      console.log("errordsadasdsad", error?.message);
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["hotels"],
    queryFn: () =>
      apiServiceCall({
        url: `service`,
        method: "GET",
        headers: {
          "Accept-language": locale,
        },
      }),
    select: (data) =>
      data?.data?.map((item: any) => ({ value: item?.id, label: item?.title })),
  });

  // const handleCaptchaChange = (token: string | null) => {
  //   if (token) {
  //     setValue("captchaToken", token);
  //     clearErrors("captchaToken");
  //     setCaptchaToken(token);
  //   } else {
  //     setError("captchaToken", {
  //       type: "manual",
  //       message: "Please verify you are not a robot",
  //     });
  //     setCaptchaToken(null);
  //   }
  // };

  const onSubmit = (data: FormData) => {
    const service_ids = data?.services?.map((item: any) => item.value);

    const formData = new FormData();

    // Append each field to FormData
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);

    // Append each service as individual entry if services is an array
    if (Array.isArray(service_ids)) {
      service_ids.forEach((service) => {
        formData.append("services[]", service);
      });
    }

    mutate(formData as any);
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.5rem",
      backgroundColor: "#0000000D",
      color: "black",
      borderColor: "#f3f4f6",
      padding: "0.25rem",
      boxShadow: "none",
      "&:hover": {
        border: "3px solid var(--primary-color)",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--primary-color)" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "var(--primary-color)" : "#f3f4f6",
      },
    }),
  };

  return (
    <div className="fixed z-[99] left-0 top-0 w-full h-svh px-5 bg-black/40 pt-5 overflow-y-scroll">
      <div
        className={`mx-auto w-full px-0 md:px-4 lg:px-8 py-8 md:w-[400px] lg:w-[600px] z-50 flex items-center justify-center ${className}`}
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <form
          className={`w-full p-4 rounded-3xl transition-all duration-300 transform ${
            visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Close Button & Title */}
          <div className="flex flex-row-reverse justify-between transition-transform duration-300">
            <button
              className="w-[15px] h-[15px]"
              onClick={() => setOpenForm(false)}
              type="button"
            >
              <Image src={close} alt="close" width={15} height={15} />
            </button>
            <h2 className="text-[var(--primary-color)] text-2xl font-bold mb-5">
              {t("title")}
            </h2>
          </div>

          {/* Full Name */}
          <div className="grid grid-cols-1 gap-4 text-black">
            <CustomInput
              serviceMode={true}
              label={t("full_name")}
              name="fullName"
              placeholder={t("full_name_placeholder")}
              register={register}
              error={errors.fullName?.message}
            />
          </div>

          {/* Email */}
          <CustomInput
            serviceMode={true}
            label={t("email")}
            name="email"
            type="email"
            placeholder={t("email_placeholder")}
            register={register}
            error={errors.email?.message}
          />

          {/* Services (Select) */}
          <div className="mt-5">
            <label className="block mb-2 text-[16px] font-medium text-[#252525]">
              {t("required_services")}
            </label>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={data || []}
                  placeholder={t("required_services_placeholder")}
                  isLoading={!data}
                  styles={customSelectStyles}
                  className="mt-1 !bg-white"
                  {...field}
                />
              )}
            />
            {errors.services && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.services.message)}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: t("phone_required") }}
            render={({ field }) => (
              <CostumPhoneInput
                serviceMode={true}
                className="mt-5 [&_.PhoneInputCountry]:!text-white"
                label={t("phone_number")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Message Textarea */}
          <CustomTextarea
            serviceMode={true}
            label={t("message")}
            name="message"
            placeholder={t("message_placeholder")}
            register={register}
            error={errors.message?.message}
          />

          {/* reCAPTCHA */}
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

          {/* Validation / Server Errors */}
          {errors?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
          {isError && error && (
            <p className="text-red-500 text-sm mt-1">
              {(error as ApiError)?.errors?.message ||
                "Something went wrong, please try again."}
            </p>
          )}
          {isSuccess && (
            <p className="text-green-500 text-sm mt-1">
              {"Sent successfully!"}
            </p>
          )}

          {/* Submit Button */}
          <div className="bg-[var(--primary-color)] text-white rounded-lg w-[137px] p-3 text-center hover:bg-transparent hover:text-[var(--primary-color)] border border-transparent hover:border-[var(--primary-color)] group transition-all duration-300">
            <button
              type="submit"
              className="flex items-center justify-center gap-3 text-lg font-bold"
              // disabled={isPending || !captchaToken}
            >
              <Image
                src={rocket}
                alt="rocket"
                width={24}
                height={24}
                className={`flex group-hover:hidden`}
              />
              <Image
                src={rocket2}
                alt="rocket2"
                width={24}
                height={24}
                className={`hidden group-hover:flex`}
              />
              {t("button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestServiceHomeForm;
