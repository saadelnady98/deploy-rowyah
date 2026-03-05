'use client'
import * as React from "react"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Controller } from "react-hook-form";
type SelectTypes ={
  value: string;
  label: string;
  
}
// const options : GenderTypes[] = [{value: 'MALE', label:'Male'},{value: 'FEMALE', label:'female'}]

export default  function CustomSelect({control, name, placeholder, label, options, className, disabled}:{control?:any,name:string,label?:string;className?:string; placeholder?:string; options:SelectTypes[], disabled?: boolean}) {
 
  return (
    <Controller  name={name} control={control}  render={({ field }) => (
    <Select  onValueChange={field.onChange} value={field.value} disabled={disabled}>
     <div className="flex flex-col gap-[2px]">
     {label&& <label className="flex text-[14px] font-[300] text-[#FFFFFF] ">{label}</label>} 
      <SelectTrigger className={`w-full  py-[30px] border-none text-white bg-[#FFFFFF1A] rounded-[12px]    ${className&&  className}`}>
        <SelectValue placeholder={placeholder? placeholder: "select.."}/>
      </SelectTrigger>
     </div>

      <SelectContent className="bg-[#00000026] backdrop-blur-lg !px-0 !p-0 opacity-100 mt-2">

        <SelectGroup className="!m-0 !p-0 bg-[#00000026]  ">
        
          {options?.map((option) => (
            <SelectItem className="bg-[#00000026] border-b-[1px]  hover:!bg-[#FFFFFF12] hover:!text-white rounded-none py-3  z-50 backdrop-filter-[158px] !m-0 text-white"  key={option.value} value={option.value}> {option.label} </SelectItem>
          ))}
      
        </SelectGroup>
      </SelectContent>
    </Select>
  )}
  />  

)
}