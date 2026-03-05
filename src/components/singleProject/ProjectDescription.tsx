import { getTranslations } from 'next-intl/server'
import React from 'react'

const projectDescription =async ({data}:{data:any}) => {
  const t = await getTranslations("singleProject")
  return (
    <section
    data-aos="fade-up"
    data-aos-duration="1500"
    data-aos-delay="300"
     className="bg-[linear-gradient(to_top_left,_#092D42_0%,_#195368_40%,_#2F7D8F_70%,_#6599A4_100%)] flex flex-col gap-6 lg:gap-10 text-white mx-auto w-full py-10 lg:py-16 px-4 lg:px-40">
        <h2 className='text-center text-xl lg:text-[32px] font-bold'>
        {t("project_description")}
        </h2>
        <p className='text-[14px] text-center lg:text-xl font-normal'>
          {data.description}
        </p>
    </section>
  )
}

export default projectDescription
