import Link from 'next/link'
import React from 'react'
type Props={
    href?:string,
    className?:string,
    title:string
    onClick?:()=>void
}
const Button = ({href,className,title,onClick}:Props) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`transition-all duration-300 ${className}`}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`transition-all duration-300 ${className}`}
    >
      {title}
    </button>
  );
}

export default Button
