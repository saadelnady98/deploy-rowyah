// "use client";
// import React from "react";
// import { Icon } from "@iconify/react";
// import { DatePickerWithRange } from "./RangeDatepiker";
// // import Guests from "./Gustes";
// import { useForm } from "react-hook-form";
// import { useTranslations } from "next-intl";
// import { useMutation } from "@tanstack/react-query";
// import apiServiceCall from "@/lib/apiServiceCall";
// import { formatDate } from "@/lib/utils";
// import Image from "next/image";
// import edit from "@/public/edit.svg";
// import trash from "@/public/trashc.svg";
// import defaultimg from "@/public/defaultimg.png";
// import building from "@/public/building.svg";

// interface ReservationModalProps {
//   defaultValues: any;
//   onClose: () => void;
//   className?: string;
//   editmode?: any;
//   indexToUpdateCartInlocalstorage?: any;
// }

// const ReservationModal: React.FC<ReservationModalProps> = ({
//   defaultValues,
//   editmode,
//   indexToUpdateCartInlocalstorage,
//   onClose,
//   className = "",
// }) => {

//   // Ensure we properly convert the date strings from local storage to Date objects
//   const defaultDateValue =
//     defaultValues?.checkin_date && defaultValues?.checkout_date
//       ? {
//           from: new Date(defaultValues.checkin_date),
//           to: new Date(defaultValues.checkout_date),
//         }
//       : "";

//   const [checkedData, setCheckedData] = React.useState({});
//   const t = useTranslations("Cart");
//   const { control, getValues, setValue, handleSubmit, watch } = useForm({
//     defaultValues: {
//       date: defaultDateValue,
//       branch: "",
//       adults: defaultValues?.adults || 0,
//       ages: defaultValues?.ages || [],
//     },
//   });

//   const { mutate, isError, isSuccess, isPending, error } = useMutation({
//     mutationFn: (data) =>
//       apiServiceCall({ url: "cart", body: data, method: "POST" }),
//     onSuccess: (data) => {
//       // id: 1
//       // available_rooms: 5
//       // bed_count: 1
//       // hotel_id: 1
//       // max_guest_count: 1
//       // price_per_night: "1000.00"
//       // room_size: "50m"
//       // room_type_id:1

//       // if check avilable is true
//       if (data?.data?.status) {
//         const cartLocalStorage = localStorage.getItem("cart");
//         if (!cartLocalStorage) {
//           const cartData = [];
//           cartData.push({ ...checkedData });
//           localStorage.setItem("cart", JSON.stringify(cartData));
//         }

//         // if (cartLocalStorage && !editmode) {
//         //   const cartData = JSON.parse(cartLocalStorage);

//         //   cartData.push({ ...checkedData });
//         //   localStorage.setItem("cart", JSON.stringify(cartData));
//         // }

//         // if (cartLocalStorage && editmode) {
//         //   const cartData = JSON.parse(cartLocalStorage);
//         //   const index = cartData.findIndex(
//         //     (item: any) => item?.id === defaultValues?.id
//         //   );
//         //   cartData[index] = { ...checkedData };
//         //   localStorage.setItem("cart", JSON.stringify(cartData));
//         // }
//         if (cartLocalStorage) {
//           const cartData = JSON.parse(cartLocalStorage);
//           if (
//             indexToUpdateCartInlocalstorage >= 0 &&
//             indexToUpdateCartInlocalstorage !== null &&
//             indexToUpdateCartInlocalstorage !== undefined &&
//             indexToUpdateCartInlocalstorage < cartData.length
//           ) {
//             cartData[indexToUpdateCartInlocalstorage] = { ...checkedData };
//           } else {
//             cartData.push({ ...checkedData });
//           }

//           // const index = cartData.findIndex(
//           //   (item: any) => item?.id === defaultValues?.id
//           // );
//           // if (index !== -1) {
//           //   cartData[index] = { ...checkedData };
//           // } else {
//           //   cartData.push({ ...checkedData });
//           // }
//           localStorage.setItem("cart", JSON.stringify(cartData));
//           onClose();
//         }

//         onClose();
//         //   data?.room_id;
//         //   data?.checkin_date;
//         //   data?.checkout_date;
//         //   data?.adults;
//         //   data?.ages;
//         // set this data and room in cart in local storage
//         //   localStorage.setItem("cart", JSON.stringify(data));
//       }
//     },
//     onError: (error) => {
//     },
//   });

//   const onSubmit = (data: any) => {

//     // const room_ids

//     const dataToSetInStateAndLocalStorage = {
//       id: defaultValues?.id,
//       images: defaultValues?.images,
//       checkin_date: data?.date?.from,
//       checkout_date: data?.date?.to,
//       adults: data?.adults,
//       ages: data?.ages,
//       children: data?.ages?.length,
//       price_per_night: defaultValues?.price_per_night,
//       room_type: defaultValues?.room_type,
//     };

//     setCheckedData(dataToSetInStateAndLocalStorage);

//     let dataTocheckedToApi = {
//       room_id: defaultValues?.id,
//       checkin_date: formatDate(data?.date?.from),
//       checkout_date: formatDate(data?.date?.to),
//       adults: data?.adults,
//       children: data?.ages?.length,
//     };


//     const localstorageData = localStorage.getItem("cart");
//     if (localstorageData) {
//       const dataFromLocalStorage = JSON.parse(localstorageData);
      
//       // استخدام Set لإزالة المعرفات المكررة
//       const uniqueRoomIds = [...new Set(dataFromLocalStorage.map((item : any) => item?.id))];
      
//       if (uniqueRoomIds?.length > 0) {
//         dataTocheckedToApi.room_ids = uniqueRoomIds;
//       }
//     }

//     mutate(dataTocheckedToApi);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[99]">
//       <div
//         className={`relative w-full max-w-[1000px] mx-auto px-4 ${className}`}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-[-50px] right-[10px] z-50 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
//           aria-label="Close"
//         >
//           <Icon icon="mdi:close" className="text-2xl" />
//         </button>

//         {/* ........................................ */}
//         <div className="flex flex-col rounded-3xl">
//           <div className="flex flex-col md:flex-row p-4 gap-7 border-b border-[#ffffff20]">
//             {/* <img src={room} alt="" /> */}
//             <Image
//               src={defaultValues?.images?.[0]?.original_url || defaultimg}
//               width={500}
//               height={500}
//               alt="location"
//               className="aspect-[1/1] w-full md:max-w-[180px] object-cover rounded-3xl"
//             />
//             <div className="flex flex-col justify-around gap-4">
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center justify-between text-white text-[24px]">
//                   <span>{defaultValues?.room_type?.name}</span>
//                 </div>

//                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
//                   <div className="flex gap-2">
//                     {/* <span className="text-gold text-[24px]">
//                           <IoPeopleOutline />
//                         </span> */}
//                     <Image
//                       src={building|| defaultimg}
//                       width={50}
//                       height={50}
//                       alt="location"
//                       className="w-5 h-5"
//                     />
//                     <span className="text-white text-sm lg:text-base">
//                       {" "}
//                       {"hotel?.name"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center text-[15px] sm:text-[19px] lg:text-[20px] font-semibold">
//                 <span className="text-gold text-[#CAB16C]">
//                   {defaultValues?.price_per_night} {t("sar")}
//                 </span>

//                 <span className="text-white ">/ {t("night")}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* -------------------------------- */}
//         <div className="flex flex-col lg:flex-row  items-center gap-5 py-5">
//           <div className="w-full lg:w-[40%] relative flex flex-col gap-[2px] ">
//             <div className="absolute top-[50%] end-[12px]">
//               <svg
//                 width="19"
//                 height="19"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M7 9.5L12 14.5L17 9.5"
//                   stroke="#CAB16C"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>

//             <label htmlFor=""> التاريخ</label>
//             <DatePickerWithRange control={control} watch={watch} />
//             {/* <CustomSelect className='ps-11' options={[{value:'amr', label:'amr'},{value:'amrooo', label:'amroo'},{value:'amrrr', label:'amory'}]} label='الفرع' placeholder='اختر الفندق' name="branch" control={control}/> */}
//           </div>
//           <div className="w-full lg:w-[40%] relative flex flex-col gap-[2px] ">
//             <div className="absolute top-[50%] start-[12px]"></div>

//             <label htmlFor=""> عدد الضيوف</label>
//             {/* <Guests setValue={setValue} watch={watch} getValues={getValues} /> */}
//             {/* <CustomSelect className='ps-11' options={[{value:'amr', label:'amr'},{value:'amrooo', label:'amroo'},{value:'amrrr', label:'amory'}]} label='الفرع' placeholder='اختر الفندق' name="branch" control={control}/> */}
//           </div>
//           <button
//             type="submit"
//             onClick={handleSubmit(onSubmit)}
//             className=" w-full lg:w-[22%] text-center mt-5 rounded-full font-bold bg-white py-4 px-[48px]  text-[#CAB16C]"
//           >
//             {t("add_to_card")}
//           </button>
//         </div>
//         {/* -------------------------------- */}
//         {/* {errors?.message && (
//           <p className="text-red-500 text-sm mt-1">
//             {errors?.message?.message}
//           </p>
//         )} */}
//         {isError && error && (
//           <p className="text-red-500 text-sm mt-1">
//             {error?.message || "something went round please try again"}
//           </p>
//         )}
//         {/* {isSuccess && (
//           <p className="text-green-500 text-sm mt-1">{"sent success"}</p>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default ReservationModal;
