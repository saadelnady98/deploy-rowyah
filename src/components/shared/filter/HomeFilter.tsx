// "use client";
// import React, { useEffect, useState } from "react";
// import FilterWrrapper from "./FilterWrrapper";
// import CustomSelect from "@/components/reusableComponent/CustomSelect";
// import { useForm } from "react-hook-form";
// import { DatePickerWithRange } from "@/components/reusableComponent/RangeDatepiker";
// import Guests from "@/components/reusableComponent/Gustes";
// import { format } from "date-fns";
// import { formatDate, parseCheckInOutDates } from "@/lib/utils";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useQuery } from "@tanstack/react-query";
// import apiServiceCall from "@/lib/apiServiceCall";

// const HomeFilter = ({
//   locale,
//   hotels,
//   fixedHotelId,
//   filterMode = "hotels",
//   onFilterAction,
// }: {
//   hotels: any;
//   locale: string;
//   fixedHotelId?: string | number;
//   filterMode?: "hotels" | "rooms";
//   onFilterAction?: (params: Record<string, string>) => void;
// }) => {
//   const t = useTranslations("filter");
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [hotelsOptions, setHotelsOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
 
//   const { control, getValues, setValue, handleSubmit, watch, reset } = useForm({
//     defaultValues: {
//       date: "",
//       hotel_id: fixedHotelId ? String(fixedHotelId) : "",
//       adults: 0,
//       ages: [],
//       roomtype_id: "", // Added for room type selection
//     },
//   });

//   // Get the selected hotel ID for fetching room types
//   const selectedHotelId = watch("hotel_id") || fixedHotelId;

//   // Fetch room types when filterMode is rooms and a hotel is selected
//   const { data: roomTypesData, isLoading: isRoomTypesLoading } = useQuery({
//     queryKey: ["roomTypes", selectedHotelId],
//     queryFn: async () => {
//       return apiServiceCall({
//         url: `filter/roomtype/${selectedHotelId}`,
//         method: "GET",
//         headers: {
//           "Accept-language": locale,
//         },
//       });
//     },
//     enabled: filterMode === "rooms" && !!selectedHotelId,
//   });

//   // Prepare room type options for the select
//   const roomTypeOptions =
//     roomTypesData?.data?.map((roomType: any) => ({
//       value: String(roomType.id),
//       label: roomType.name,
//     })) || [];

//   const handleSearchParams = (data: any) => {
//     setIsLoading(true);

//      if (!data.adults && data.adults !== 0) {
//       delete data.adults;
//     }

//     // Always use fixedHotelId if provided, otherwise use selected hotel_id
//     if (fixedHotelId) {
//       data.hotel_id = String(fixedHotelId);
//     } else if (data.hotel_id === "") {
//       delete data.hotel_id;
//     }

//     if (data.date === "") {
//       delete data.date;
//     } else {
//        data.checkin_date = formatDate(data.date.from);
//       data.checkout_date = formatDate(data.date.to);
//       delete data.date;
//     }

//     if (data.ages.length === 0) {
//       delete data.ages;
//     } else {
//       data.ages = data.ages.join(",");
//     }

//     // Handle roomtype_id based on filterMode
//     if (filterMode !== "rooms" && data.roomtype_id) {
//       delete data.roomtype_id;
//     }

 
//     if (filterMode === "hotels") {
//       // Original behavior - redirect to hotels page
//       const params = new URLSearchParams(data);
//       router.push(`/${locale}/hotels?${params}`);
//        setIsLoading(false);
//     } else if (onFilterAction) {
//       // URL-based approach for rooms filtering
//       onFilterAction(data);
//       setIsLoading(false);
//      } else {
//       // Default case - just finish loading if no handler is provided
//       setIsLoading(false);
//       console.warn("No filter action handler provided for mode:", filterMode);
//     }
//   };

//   const onSubmit = (data) => {
//     handleSearchParams(data);
//   };
//   useEffect(() => {
//     if (searchParams.size > 0) {
     
//       reset({
//         date: parseCheckInOutDates(
//           searchParams.get("checkin_date"),
//           searchParams.get("checkout_date")
//         ),
//         hotel_id: fixedHotelId
//           ? String(fixedHotelId)
//           : searchParams.get("hotel_id") || "",
//         adults: searchParams.get("adults") || 0,
//         ages: searchParams.get("ages")?.split(",") || [],
//         roomtype_id: searchParams.get("roomtype_id") || "",
//       });
//     }

//     const hotelsOptionss = hotels?.map((hotel: any) => {
//       return { value: String(hotel?.id), label: hotel?.name };
//     });
//     setHotelsOptions(hotelsOptionss);

//     setIsLoading(false);
//   }, []);

//   return (
//     <FilterWrrapper>
//       <div className="flex flex-col lg:flex-row  items-center  gap-5">
//         {/* Hotel Branch Select - Always in DOM but conditionally visible */}
//         <div
//           className={`w-full lg:w-[30%] relative ${
//             filterMode === "rooms" ? "hidden" : "block"
//           }`}
//         >
//           <div className="absolute top-[50%] start-[12px]">
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12 14.1704C9.87 14.1704 8.13 12.4404 8.13 10.3004C8.13 8.16043 9.87 6.44043 12 6.44043C14.13 6.44043 15.87 8.17043 15.87 10.3104C15.87 12.4504 14.13 14.1704 12 14.1704ZM12 7.94043C10.7 7.94043 9.63 9.00043 9.63 10.3104C9.63 11.6204 10.69 12.6804 12 12.6804C13.31 12.6804 14.37 11.6204 14.37 10.3104C14.37 9.00043 13.3 7.94043 12 7.94043Z"
//                 fill="#CAB16C"
//               />
//               <path
//                 d="M12 22.76C10.52 22.76 9.02999 22.2 7.86999 21.09C4.91999 18.25 1.65999 13.72 2.88999 8.33C3.99999 3.44 8.26999 1.25 12 1.25C12 1.25 12 1.25 12.01 1.25C15.74 1.25 20.01 3.44 21.12 8.34C22.34 13.73 19.08 18.25 16.13 21.09C14.97 22.2 13.48 22.76 12 22.76ZM12 2.75C9.08999 2.75 5.34999 4.3 4.35999 8.66C3.27999 13.37 6.23999 17.43 8.91999 20C10.65 21.67 13.36 21.67 15.09 20C17.76 17.43 20.72 13.37 19.66 8.66C18.66 4.3 14.91 2.75 12 2.75Z"
//                 fill="#CAB16C"
//               />
//             </svg>
//           </div>
//           <CustomSelect
//             className="ps-11"
//             options={hotelsOptions || []}
//             label={t("hotel_branch")}
//             placeholder={t("select_hotel")}
//             name="hotel_id"
//             control={control}
//             disabled={!!fixedHotelId}
//           />
//         </div>

//         {/* Room Type Select - Only visible in rooms mode */}
//         {filterMode === "rooms" && (
//           <div className="w-full lg:w-[30%] relative ">
//             <div className="absolute top-[50%] start-[12px]">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 14.1704C9.87 14.1704 8.13 12.4404 8.13 10.3004C8.13 8.16043 9.87 6.44043 12 6.44043C14.13 6.44043 15.87 8.17043 15.87 10.3104C15.87 12.4504 14.13 14.1704 12 14.1704ZM12 7.94043C10.7 7.94043 9.63 9.00043 9.63 10.3104C9.63 11.6204 10.69 12.6804 12 12.6804C13.31 12.6804 14.37 11.6204 14.37 10.3104C14.37 9.00043 13.3 7.94043 12 7.94043Z"
//                   fill="#CAB16C"
//                 />
//                 <path
//                   d="M12 22.76C10.52 22.76 9.02999 22.2 7.86999 21.09C4.91999 18.25 1.65999 13.72 2.88999 8.33C3.99999 3.44 8.26999 1.25 12 1.25C12 1.25 12 1.25 12.01 1.25C15.74 1.25 20.01 3.44 21.12 8.34C22.34 13.73 19.08 18.25 16.13 21.09C14.97 22.2 13.48 22.76 12 22.76ZM12 2.75C9.08999 2.75 5.34999 4.3 4.35999 8.66C3.27999 13.37 6.23999 17.43 8.91999 20C10.65 21.67 13.36 21.67 15.09 20C17.76 17.43 20.72 13.37 19.66 8.66C18.66 4.3 14.91 2.75 12 2.75Z"
//                   fill="#CAB16C"
//                 />
//               </svg>
//             </div>
//             <CustomSelect
//               className="ps-11"
//               options={roomTypeOptions || []}
//               label={t("room_type")}
//               placeholder={t("select_room_type")}
//               name="roomtype_id"
//               control={control}
//               isLoading={isRoomTypesLoading}
//             />
//           </div>
//         )}

//         {/* Hidden Hotel Select when in rooms mode to maintain form value */}
//         {filterMode === "rooms" && (
//           <div className="hidden">
//             <CustomSelect
//               options={hotelsOptions || []}
//               name="hotel_id"
//               control={control}
//               disabled={!!fixedHotelId}
//             />
//           </div>
//         )}
//         <div className="w-full lg:w-[30%] relative flex flex-col gap-[2px] ">
//           <div className="absolute top-[50%] end-[12px]">
//             <svg
//               width="19"
//               height="19"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7 9.5L12 14.5L17 9.5"
//                 stroke="#CAB16C"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <label className="text-[14px] font-[300]" htmlFor="">
//             {" "}
//             {t("date")}
//           </label>
//           <DatePickerWithRange lang={locale} control={control} watch={watch} />
//           {/* <CustomSelect className='ps-11' options={[{value:'amr', label:'amr'},{value:'amrooo', label:'amroo'},{value:'amrrr', label:'amory'}]} label='الفرع' placeholder='اختر الفندق' name="branch" control={control}/> */}
//         </div>
//         <div className="w-full lg:w-[30%] relative flex flex-col gap-[2px] ">
//           <div className="absolute top-[50%] start-[12px]"></div>

//           <label className="text-[14px] font-[300]" htmlFor="">
//             {t("guests")}
//           </label>
//           <Guests setValue={setValue} watch={watch} getValues={getValues} />
//           {/* <CustomSelect className='ps-11' options={[{value:'amr', label:'amr'},{value:'amrooo', label:'amroo'},{value:'amrrr', label:'amory'}]} label='الفرع' placeholder='اختر الفندق' name="branch" control={control}/> */}
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit(onSubmit)}
//           disabled={isLoading}
//           className={`w-full lg:w-[20%] 2xl:w-[15%] text-center mt-5 rounded-full font-bold bg-white py-4 px-[48px] text-[#CAB16C] ${
//             isLoading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {isLoading ? t("loading") : t("show_results")}
//         </button>
//       </div>
//     </FilterWrrapper>
//   );
// };

// export default HomeFilter;
