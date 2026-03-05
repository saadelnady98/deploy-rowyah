import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label: string;
  name: string;
  serviceMode?: boolean;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  serviceMode,
  type = "text",
  placeholder,
  register,
  error,
  icon,
}) => {
  return (
    <div className="mb-5">
      <label
        className={`block ${serviceMode ? "text-[#252525]" : "text-white"}  mb-2 text-[16px] font-medium`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`text-[14px] md:text-[16px] w-full focus:outline-[var(--primary-color)] focus:ring-0  ${serviceMode ? "bg-[#0000000D] " : "bg-[#FFFFFF26]"}  bg-opacity-5 rounded-lg px-2 py-3 ${serviceMode ? "text-{#0000000D}" : "text-white"}  ${serviceMode ? "placeholder-[#195368]" : "placeholder-white"}   ${
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
      {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
    </div>
  );
};

export default CustomInput;
