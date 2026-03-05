// 'use client'
// import * as React from "react"


// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
  
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"



// export type SelectTypes ={
//   value: string;
//   label: string;
  
// }

// // const options : GenderTypes[] = [{value: 'MALE', label:'Male'},{value: 'FEMALE', label:'female'}]
// export default  function AgeSelect({placeholder, label, onChange, options, index, error, value}:{onChange: (error:boolean,vlaue:string, index:number)=>void ; index:number;label?:string; placeholder?:string; options:SelectTypes[],value:string}) {
 
//   return (
   
//     <Select value={value } onValueChange={(value)=> onChange(value, index)}  >
//        {label&& <label className="flex mb-2">{label}</label>} 
//       <SelectTrigger className={` w-full   ${error && value === "0"?"border-red-500":""}  !py-[20px] h-[45px] `}>
//         <SelectValue placeholder={placeholder? placeholder: "select.."}/>
//       </SelectTrigger>
//       <SelectContent>

//         <SelectGroup>
        
//           {options?.map((option) => (
//             <SelectItem  className="!text-black" key={option.value} value={option.value}> {option.label} </SelectItem>
//           ))}
      
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )}
 

