import React from "react";
type Props = {
  className?: string;
  children: React.ReactNode;
};
const Container = ({ className, children }: Props) => {
  return (
    <div
      className={`container mx-auto md:py-[10px] px-4 md:px-5 xl:px-24 2xl:px-16 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
