import Image from 'next/image'
import React from 'react'
import whatsappIcon from '@/public/images/navBar/Whatsapp.svg'

const whatsapp = ({data }: {data: any}) => {
  return (
    <>
      <div className='fixed ltr:!left-[32px] rtl:right-[32px]  bottom-[32px] z-50 transition-transform lg:animate-[jumpTwice_8s_ease-in-out_infinite]'>
        <span className="border-animation " style={{"--i": "0"} as React.CSSProperties}></span>
        <span className="border-animation" style={{"--i": "1"} as React.CSSProperties}></span>
        {/* <span className="border-animation" style={{"--i": "3"} as React.CSSProperties}></span> */}
        
        <div className='bg-[var(--primary-color)] rounded-full flex justify-center items-center p-[10px] w-[52px] h-[52px] '>
          <a
          href={`https://wa.me/${data?.whatsapp?.replace(/[^\d+]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="z-50"
          >
            <Image
              src={whatsappIcon}
              alt="WhatsApp"
              width={28}
              height={28}
              className="hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </>
  )
}

export default whatsapp