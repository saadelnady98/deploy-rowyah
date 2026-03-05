// components/ui/ContactForm.tsx  (or wherever your form lives)
'use client';
import CostumPhoneInput from '@/components/reusableComponent/PhoneInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '@/components/ui/CustomInput';
import CustomTextarea from '@/components/ui/CustomTextarea';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import apiServiceCall from '@/lib/apiServiceCall';
import Image from 'next/image';
import defaultImg from '@/public/images/navBar/Mask group.svg';
// import ReCAPTCHA from 'react-google-recaptcha';

type ContactFormProps = {
  className?: string;
  serviceMode?: boolean;
  contactMode?:boolean;
  description?: string;
  endPoint?: string;
  serviceId?: string;
  /** New: make these optional so you can omit them if you want default text inside */
  title?: string;
  buttonTitle?: string;
  buttonStyle?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  image2?: { url: string; alt?: string; width?: number; height?: number };
  image3?: { url: string; alt?: string; width?: number; height?: number  };

openForm?: boolean;
  /** New: callbacks you actually use: */
  setOpenForm?: (open: boolean) => void;
  setShowSuccessModal: (show: boolean) => void;
};

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').min(10, 'Full name must be at least 10 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
  // captchaToken: z.string().min(1, 'Please verify you are not a robot'),
});
type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC<ContactFormProps> = ({
  className ,
  endPoint = 'contacts',
  serviceMode = false,
  description,
  serviceId,
  title,
  buttonTitle,
  buttonStyle = '',
  image,
  image2,
  image3,
  openForm,
  setOpenForm,
  setShowSuccessModal,
  contactMode,
}) => {
  const t = useTranslations('contact.form');
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      captchaToken: '',
    } as FormData
  });

  const { mutate, isError, isSuccess, isPending, error } = useMutation({
    mutationFn: (data) => apiServiceCall({ url: endPoint, body: data, method: 'POST' }),
    onSuccess: () => {
       if (setOpenForm) setOpenForm(false);
      setShowSuccessModal(true);
      reset(); // Reset the form fields
      // setCaptchaToken(null);
      setTimeout(() => {
        if (setShowSuccessModal) setShowSuccessModal(false);
      }, 5000);
    },
    onError: (err) => console.error(err),
  });

  // const handleCaptchaChange = (token: string | null) => {
  //   if (token) {
  //     setValue('captchaToken', token);
  //     clearErrors('captchaToken');
  //     setCaptchaToken(token);
  //   } else {
  //     setError('captchaToken', {
  //       type: 'manual',
  //       message: 'Please verify you are not a robot',
  //     });
  //     setCaptchaToken(null);
  //   }
  // };

  const onSubmit = (data: FormData) => {
     if (serviceId) (data as any).service_id = serviceId;
    mutate(data as any);
  };

  return (
    <div 
    className={`mx-auto px-5 md:px-4 lg:px-5 py-8 z-50 flex items-center justify-center ${className}`}
    data-aos="fade-up"
    data-aos-duration="1500"
    data-aos-delay="300" >
      <form
       className={`w-full p-5 md:p-0 rounded-3xl transition-all duration-300 transform `}
       onSubmit={handleSubmit(onSubmit)}>
        {/* Close Button & Title */}
        <div className="flex flex-row-reverse justify-between transition-transform duration-300">
          <button
            className="w-[15px] h-[15px]"
            onClick={(e) => {
              e.preventDefault(); 
              if (setOpenForm) setOpenForm(false); 
            }}
            type="button"
          >
         {image3 && (
                 <Image
                    src={image3.url}
                    alt={image3.alt || "close"}
                    width={image3.width ?? 15}
                    height={image3.height ?? 15}
                     />
                )}
          </button>
      
        {title && (
          <h2 className={`${serviceMode ? 'text-[var(--primary-color)] font-bold' : ''} text-[20px] lg:text-2xl mb-5`}>
            {title}
          </h2>
        )}
</div>
        {description && <p className="mb-5">{description}</p>}

        <CustomInput
          serviceMode={serviceMode}
          label={t('full_name')}
          name="fullName"
          placeholder={t('full_name_placeholder')}
          register={register}
          error={errors.fullName?.message}
        />

        <CustomInput
          serviceMode={serviceMode}
          label={t('email')}
          name="email"
          type="email"
          placeholder={t('email_placeholder')}
          register={register}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CostumPhoneInput
              serviceMode={serviceMode}
              label={t('phone_number')}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <CustomTextarea
          serviceMode={serviceMode}
          label={t('details_tiltle')}
          name="message"
          placeholder={t('details_tiltle_placeholder')}
          register={register}
          error={errors.message?.message}
        />

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

        {isError && <p className="text-red-500 mt-2">{(error as any)?.errors?.message}</p>}

        <div className={`${buttonStyle} mt-4 group flex items-center justify-center`}>
          <button 
            type="submit" 
            className="flex items-center justify-center gap-3 w-full"
            // disabled={isPending || !captchaToken}
          >
            {image && <Image src={image.url} alt={image.alt || ''} width={image.width!} height={image.height!} className={` ${contactMode? "hidden group-hover:flex" : "flex group-hover:hidden"}`}/>}
            {image2 && <Image src={image2.url} alt={image2.alt || ''} width={image2.width!} height={image2.height!} className={` ${contactMode? "flex group-hover:hidden" : "hidden group-hover:flex"} `}/>}
            {t('buttonTitle')}
          </button>
        </div>
      </form>
    </div>
  
  );
};

export default ContactForm;
