// "use client";

// import trash from "@/public/trash.svg";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { IoChevronDown } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
// import CustomSelect from "../reusableComponent/CustomSelect";
// // import AgeSelect, { SelectTypes } from "../reusableComponent/AgesSelect";
// import users from "@/public/users.svg";
// import { useTranslations } from "next-intl";

// const options: SelectTypes[] = Array.from({ length: 18 }, (_, i) => ({
//   value: i.toString(),
//   label: i.toString(),
// }));
// const Guests = ({
//   watch,
//   setValue,
//   getValues,
// }: {
//   getValues: any;
//   watch: any;
//   setValue: any;
// }) => {
//   const t = useTranslations("filter");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isError, setIsError] = useState(false);
//   //   const [adultCount, setAdultCount] = useState(2);
//   // const [childCount, setChildCount] = useState(1);
//   //   const [ages, setAges] = useState<string[]>(["2", "12"])
//   // useEffect(()=>{

//   //     setAges(getValues('ages'))
//   // },[])
//   // useEffect(()=>{

//   // setValue("ages", ages)
//   // },[ages])
//   const toggleDropdown = () => {
//     const isVal = getValues("ages").includes("0");
//     if (isDropdownOpen === true && isVal) {
//       setIsError(true);
//       return;
//     }
//     setIsDropdownOpen(!isDropdownOpen);
//     setIsError(false);
//   };

//   const incrementAdult = () => {
//     // setAdultCount((prev) => prev + 1);
//     if (watch("adults") < 17) {
//       setValue("adults", +getValues("adults") + 1);
//     }
//   };

//   const decrementAdult = () => {
//     // setAdultCount((prev) => (prev > 0 ? prev - 1 : 0));
//     if (watch("adults") > 0) {
//       setValue("adults", +getValues("adults") - 1);
//     }
//   };

//   const incrementChild = () => {
//     // Get current ages and make sure they are all strings
//     const currentAges = getValues("ages").map((age: any) => String(age));
//     // Add new age as string
//     const newAges = [...currentAges, "0"];

//     setValue("ages", newAges);
//     setIsError(false);
//   };

//   const decrementChild = () => {
//     // Get current ages and ensure they're all strings
//     const currentAges = getValues("ages").map((age: any) => String(age));
//     // Remove the last age
//     currentAges.pop();
//     setValue("ages", currentAges);
//   };

//   // Format the guest display text
//   const getGuestText = () => {
//     let text = "";

//     if (watch("adults") > 0) {
//       text += `${watch("adults")} ${t("adults")}`;
//     }

//     if (watch("adults") > 0) {
//       if (watch("adults") > 0) {
//         text += " ";
//       }
//       if (watch("ages").length > 0) {
//         text += t("and") + " ";
//       }

//       if (watch("ages").length > 0) {
//         text += `${watch("ages").length} ${t("children")}`;
//       }
//     }

//     return text || "0 " + t("guests");
//   };

//   const agesHandler = (value: string, index: number) => {
//     // Get current ages and ensure they're all strings
//     const currentAges = getValues("ages").map((age: any) => String(age));
//     // Update the age at the specified index
//     currentAges[index] = String(value);

//     setValue("ages", currentAges);
//   };
//   return (
//     // <div className="flex flex-col border border-[#ffffff20] bg-white bg-opacity-5 rounded-3xl">

//     //   <div className=" p-4">
//     <div className="relative">
//       {/* Guest Count Dropdown Button */}
//       <button
//         className="flex items-center px-4 py-[18px] justify-between w-full bg-[#FFFFFF1A] bg-opacity-40 rounded-[12px]   text-white"
//         onClick={toggleDropdown}
//       >
//         <div className="flex items-center gap-2">
//           {/* <FaUser className="text-[#CAB16C]" /> */}
//           <Image src={users} alt="users" className="w-5 h-5" />
//           <span>{getGuestText()}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <IoChevronDown
//             className={`transform transition-transform duration-300 text-[#CAB16C] ${
//               isDropdownOpen ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//       </button>




//       {/* Dropdown Content */}
//       {isDropdownOpen && (
//         <div className="absolute top-full bg-[#00000026] backdrop-blur-sm w-full left-0 right-0 mt-4 rounded-[7px] p-4 z-10 shadow-lg border border-white">
//           <div className="flex flex-col gap-4 relative">
//             <div className="flex justify-between items-center rounded-full px-4 py-2">
//               <span className="text-white text-right">{t("adults")}</span>
//               <div className="flex gap-5">
//                 <button
//                   className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
//                   onClick={incrementAdult}
//                 >
//                   <span>+</span>
//                 </button>
//                 <span className="text-white">{watch("adults")}</span>
//                 <button
//                   className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
//                   onClick={decrementAdult}
//                 >
//                   <span>-</span>
//                 </button>
//               </div>
//             </div>
//             <hr className="w-full" />
//             <div className="flex justify-between items-center rounded-full px-4 py-2">
//               <span className="text-white text-right">{t("children")}</span>
//               <div className="flex gap-5">
//                 <button
//                   className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
//                   onClick={incrementChild}
//                 >
//                   <span>+</span>
//                 </button>
//                 <span className="text-white">{watch("ages").length}</span>
//                 <button
//                   className="text-white text-xl bg-transparent rounded-full w-6 h-6 flex justify-center items-center border border-white"
//                   onClick={decrementChild}
//                 >
//                   <span>-</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* <div className="grid grid-cols-3 gap-4 mt-3">
//             {getValues("ages")?.map((age: any, index: string) => {
//               return (
//                 <div key={index} className=" w-full">
//                   <AgeSelect
//                     onChange={agesHandler}
//                     error={isError}
//                     value={age}
//                     index={index}
//                     options={options}
//                   />
//                 </div>
//               );
//             })}
//           </div> */}
//         </div>
//       )}
//     </div>
//     //   </div>
//     // </div>
//   );
// };
// export default Guests;
