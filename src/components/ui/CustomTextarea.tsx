import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomTextareaProps {
  label: string;
  name: string;
  serviceMode?: boolean;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: React.ReactNode;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  serviceMode,
  placeholder,
  register,
  error,
  icon,
}) => {
  return (
    <div className="my-5">
      <label className={`block ${serviceMode ? "text-[#252525]" : "text-white"}  mb-2 text-[16px] font-medium`}>
        {label}
      </label>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={4}
          className={`w-full text-[14px] md:text-[16px] focus:outline-[var(--primary-color)] ${serviceMode ? "bg-[#0000000D] " : "bg-white bg-opacity-10"}  rounded-lg px-2 py-3 ${serviceMode ? "text-[#79796F]" : "text-white"} ${serviceMode ? "placeholder-[#195368]" : "placeholder-white"}   ${
            error ? "border border-red-500" : ""
          }`}
          {...register(name)}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTextarea;
