import React from 'react'
import Container from '../reusableComponent/Container'
import wrong from '@/public/images/ourProjects/Group 45.svg'
import right from '@/public/images/ourProjects/Vector 1.svg'
import red from '@/public/images/ourProjects/Ellipse 5.svg'
import green from '@/public/images/ourProjects/Ellipse 5 (1).svg'

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const problems = async ({data}:{data:any}) => {
    const t = await getTranslations("singleProject")
  // Convert <li> to custom bullet divs
  const customHtml =  data?.problems
    ?.replace(/<li>/g, '<div style="display: flex; gap: 8px; align-items: flex-start;"><span style="color:black;">•</span><span>')
    ?.replace(/<\/li>/g, '</span></div>');

    const customHtml2 =  data?.solutions
    ?.replace(/<li>/g, '<div style="display: flex; gap: 8px; align-items: flex-start;"><span style="color:black;">•</span><span>')
    ?.replace(/<\/li>/g, '</span></div>');
  return (
    <section>
        <Container>
        <h2 className='text-center text-xl lg:text-[32px] font-bold text-[var(--primary-color)] mb-12'
         data-aos="fade-up"
         data-aos-duration="1500"
         data-aos-delay="300">{t("problems_solutions")}</h2>
        {data && 
        (
            <div className='pt-0 lg:pt-20 flex flex-col gap-10 lg:gap-32'
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300">
                <div className='flex flex-col-reverse lg:flex-row w-full'>
                <div className='w-full lg:w-[70%] px-4 flex flex-col justify-center mx-auto'>
                <h2 className='text-xl lg:text-[28px] font-bold text-[var(--primary-color)] mb-4'><Image src={red} alt="red" className='inline'/> {t("problems")}</h2>    
                <div className='text-[16px] lg:text-xl font-normal list-disc list-inside leading-10' dangerouslySetInnerHTML={{__html:customHtml}}/>
              
                    
              
                </div> 
                
                <div className=' mx-auto w-[50%] lg:w-[30%] flex justify-center items-center'>
                    <Image src={wrong} alt="wrong" className='w-[300px] ' width={346} height={346}/>
                </div>
                </div>
                <div className='flex flex-col lg:flex-row w-full justify-between'>
              
                <div className='flex w-full justify-between flex-col lg:flex-row'>
                <div className='mx-auto w-[70%] lg:w-[40%] px-4 flex justify-center items-center'>
                    <Image src={right} alt="right" className='w-[300px]' width={346} height={346}/>
                </div>
                <div  className='flex  flex-col w-full lg:w-[60%]'>
                <h2 className='text-xl lg:text-[28px] font-bold text-[var(--primary-color)] mb-6 lg:mb-4 '><Image src={green} alt="green" className='inline'/> {t("solutions")}</h2>
                <div className='text-[16px] lg:text-xl font-normal list-disc list-inside leading-10' dangerouslySetInnerHTML={{__html:customHtml2}}/>
                </div>
            </div>
            </div>
            </div>
       
        )
        }
        </Container>
    </section>
  )
}

export default problems
