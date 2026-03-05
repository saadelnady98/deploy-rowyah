'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Container from '../reusableComponent/Container'
import { useLocale, useTranslations } from 'next-intl';
import ContactUsForm from "@/components/shared/contactUsForm/contactUsForm";
import rocket from "@/public/images/services/Rocket.svg"
import rocket2 from "@/public/images/services/Rocke2t.svg";
import close from "@/public/images/heroSection/Vector.svg"
import Success from '../Success';

const ServiceRightSection = ({data}:{data:any}) => {
    const [openForm, setOpenForm] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const locale = useLocale();
    const t = useTranslations('contact.servicesForm');

    useEffect(() => {
        setMounted(true);
    }, []);

    const SuccessModal = () => (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0
            }}
        >
            <div className="relative">
                <Success />
            </div>
        </div>
    );

    return (
        <>
            <div>
                <ContactUsForm
                    title={t('title')}
                    description={t('description')}
                    serviceMode
                    endPoint="booking"
                    serviceId={String(data.data.id)}
                    className="mx-auto w-full px-0 md:px-4 lg:px-8 py-8 md:w-[400px] lg:w-[477px] lg:flex items-center justify-center bg-[#f9f9f9] rounded-3xl hidden"
                    buttonTitle={t('button')}
                    buttonStyle="bg-[var(--primary-color)] text-white w-[230px] text-[14px] font-bold rounded-[8px] py-[10px] px-10 hover:bg-transparent hover:text-[var(--primary-color)] border bordre-transparent hover:border-[var(--primary-color)] "
                    image={{ url: rocket, width: 24, height: 24 }}
                    image2={{ url: rocket2, width: 24, height: 24 }}
                    setShowSuccessModal={setShowSuccessModal}
                    openForm={openForm}
                    setOpenForm={setOpenForm}
                />
            </div>

            {/* Success Modal - Rendered using Portal */}
            {mounted && showSuccessModal && createPortal(
                <SuccessModal />,
                document.body
            )}
        </>
    )
}

export default ServiceRightSection