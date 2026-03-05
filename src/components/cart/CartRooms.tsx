// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useTranslations, useLocale } from "next-intl";

// import edit from "@/public/edit.svg";
// import trash from "@/public/trashc.svg";
// import calendar from "@/public/calendar.svg";
// import profile from "@/public/profile.svg";
// import { formatDateToMonthDay } from "@/lib/utils";
// import ReservationModal from "../reusableComponent/ReservationModal";
// import Trash from "../reservation-cart/Trash";
// import defaultimg from "@/public/defaultimg.png";

// function CartRooms() {
//   const t = useTranslations("Cart");
//   const locale = useLocale();
//   const [cartData, setCartData] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);
//   const [indexToUpdateCartInlocalstorage, setIndexToUpdateCartInlocalstorage] =
//     useState<number | null>(null);

//   useEffect(() => {
//     const cartLocalStorage = localStorage.getItem("cart");
//     if (cartLocalStorage) {
//       const parsedData = JSON.parse(cartLocalStorage);
//       setCartData(parsedData);
//     }
//   }, [localStorage.getItem("cart")]);

//   const handleDeleteRoom = (index: number) => {
//     const updatedCart = [...cartData];
//     updatedCart.splice(index, 1);

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCartData(updatedCart);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className=" p-4 bg-white bg-opacity-5 rounded-3xl overflow-hidden border border-[#FFFFFF33]">
//       <h2 className="text-2xl font-medium mb-4">{t("selected_rooms")}</h2>
//       {/* ........................................ */}
//       {cartData?.length > 0 ? (
//         cartData?.map((room, index) => (
//           <div key={index} className="flex flex-col rounded-3xl">
//             <div className="flex flex-col md:flex-row  p-4 gap-7 border-b border-[#ffffff20]">
//               {/* <img src={room} alt="" /> */}
//               {room?.images?.[0]?.original_url && (
//                 <Image
//                   src={room?.images?.[0]?.original_url || defaultimg}
//                   width={500}
//                   height={500}
//                   alt="location"
//                   className="aspect-[1/1] w-full md:max-w-[180px] object-cover rounded-3xl"
//                 />
//               )}
//               <div className="flex flex-col justify-around gap-4 w-full">
//                 <div className="flex flex-col gap-2">
//                   <div className="flex items-center justify-between text-white text-[24px]">
//                     <span>{room?.room_type?.name}</span>
//                     <div className="flex gap-1">
//                       <div
//                         className="bg-[#FFFFFF0D] hover:bg-[#FFFFFF33] duration-300 rounded-md p-2 flex items-center justify-center"
//                         onClick={() => {
//                           setIndexToUpdateCartInlocalstorage(index);
//                           setSelectedRoom(room);
//                           setIsModalOpen("reservation");
//                         }}
//                       >
//                         <Image
//                           className="w-[20px] h-[20px]"
//                           src={edit || defaultimg}
//                           width={50}
//                           height={50}
//                           alt="edit"
//                         />
//                       </div>
//                       <div
//                         className="bg-[#FFFFFF0D] hover:bg-[#FFFFFF33] duration-300 rounded-md p-2 flex items-center justify-center"
//                         onClick={() => {
//                           setIndexToUpdateCartInlocalstorage(index);
//                           setSelectedRoom(room);
//                           setIsModalOpen("trash");
//                         }}
//                       >
//                         <Image
//                           className="w-[20px] h-[20px]"
//                           src={trash || defaultimg}
//                           width={50}
//                           height={50}
//                           alt="delete"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-5 lg:gap-20">
//                     <div className="flex gap-2">
//                       {/* <span className="text-gold text-[24px]">
//                           <IoPeopleOutline />
//                         </span> */}
//                       <Image
//                         src={calendar || defaultimg}
//                         width={50}
//                         height={50}
//                         alt="location"
//                         className="w-5 h-5"
//                       />
//                       <span className="text-white text-sm lg:text-base">
//                         {formatDateToMonthDay(room?.checkin_date, locale)} -{" "}
//                         {formatDateToMonthDay(room?.checkout_date, locale)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 lg:gap-20">
//                     <div className="flex gap-2">
//                       {/* <span className="text-gold text-[24px]">
//                           <IoPeopleOutline />
//                         </span> */}
//                       <Image  
//                         src={profile || defaultimg}
//                         width={50}
//                         height={50}
//                         alt="location"
//                         className="w-5 h-5"
//                       />
//                       <span className="text-white text-sm lg:text-base">
//                         {room?.adults} {t("adults")} - {room?.ages?.length}{" "}
//                         {t("children")}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-[15px] sm:text-[19px] lg:text-[20px] font-semibold">
//                   <span className="text-gold text-[#CAB16C]">
//                     {room?.price_per_night} {t("sar")}
//                   </span>

//                   <span className="text-white ">/ {t("night")}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-white/50 text-lg">
//           {t("no_rooms_selected")}
//         </div>
//       )}
//       {cartData?.length > 0 && (
//         <div className="mt-5 flex flex-col gap-2">
//           {/* <div className="flex items-center justify-between text-xl ">
//             <span className="font-light">{t("price")}</span>
//             <span className="font-normal">150 {t("sar")}</span>
//           </div> */}
//           <div className="flex items-center justify-between text-xl ">
//             <span className="font-light">{t("total")}</span>
//             <span className="font-normal text-[#CAB16C]">
//               {cartData?.reduce((acc, room) => acc + +room?.price_per_night, 0)}{" "}
//               {t("sar")}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Reservation Modal  */}
//       {isModalOpen === "reservation" && (
//         <ReservationModal
//           editmode
//           indexToUpdateCartInlocalstorage={indexToUpdateCartInlocalstorage}
//           defaultValues={selectedRoom}
//           onClose={() => setIsModalOpen(false)}
//           className="bg-black"
//         />
//       )}

//       {/* Trash Modal */}
//       {isModalOpen === "trash" && (
//         <Trash
//           open={isModalOpen === "trash"}
//           close={() => setIsModalOpen(false)}
//           onDelete={() => {
//             if (indexToUpdateCartInlocalstorage !== null) {
//               handleDeleteRoom(indexToUpdateCartInlocalstorage);
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default CartRooms;
