// "use client";

// import room from "@/public/card.png";
// import Container from "@/components/reusableComponent/Container";
// import MainButton from "@/components/reusableComponent/MainButton";
// import Image from "next/image";
// // import { getTranslations } from "next-intl/server";
// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import ImageSlider from "./ImageSlider";
// import { Icon } from "@iconify/react";
// import HotelImageGrid from "../reusableComponent/HotelImageGrid";
// import ImageModal from "../reusableComponent/ImageModal";
// import pic1 from "@/public/card.png";
// import pic5 from "@/public/card.png";
// import ReservationModal from "../reusableComponent/ReservationModal";
// import defaultimg from "@/public/defaultimg.png";

// const Rooms = ({ data, isLoading = false }: { data: any; isLoading?: boolean }) => {
//   // const t = await getTranslations("SingleHotelPage");
//   const t = useTranslations("SingleHotelPage");
//   // available_rooms: 5
//   // bed_count: 1
//   // id: 1
//   // max_guest_count: 1
//   // price_per_night: "1000.00"
//   // room_size: "50m"
//   // room_type: amenities: [{…}]
//   // description: "knklj"
//   // id: 1
//   // image: {id: 59, file_name: '2.jpeg', original_url: 'https://api-dorrataiba.tetane.com/storage/59/2.jpeg', extension: 'jpeg', size: 288707}
//   // name: "jiji"
//   // slug: "nkjkn"
//   const [isModalOpen, setIsModalOpen] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);

//   const openModal = (modulName: string) => {
//     setIsModalOpen(modulName);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setIsModalOpen(null);
//     document.body.style.overflow = "auto";
//   };

//   return (
//     <>
//       <Container>
//         <div className=" flex flex-col gap-6 ">
//           <span className="text-white text-[24px] font-medium">
//             {t("available_rooms")}
//           </span>
          
//           {isLoading ? (
//             <div className="flex flex-col items-center justify-center py-10">
//               <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
//               <p className="text-white text-[16px]">{t("loading_rooms")}</p>
//             </div>
//           ) : data && data.length > 0 ? (
//             data.map((item: any, index: number) => (
//               <div
//                 key={item?.id}
//                 className="flex flex-col border border-[#ffffff20] bg-white bg-opacity-5 rounded-3xl"
//               >
//                 <div className="flex flex-col md:flex-row p-4 gap-7">
//                   {/* <img src={room} alt="" /> */}
//                   <Image
//                     src={item?.room_type?.image?.original_url || defaultimg}
//                     width={500}
//                     height={500}
//                     alt="location"
//                     className="aspect-[1/1] w-full md:max-w-[180px] lg:max-w-[210px] xl:max-w-[230px] object-cover rounded-3xl"
//                   />
//                   <div className="flex flex-col justify-around gap-4">
//                     <span className="text-white text-[24px]">
//                       {item?.room_type?.name}
//                     </span>

//                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
//                       {item?.room_type?.amenities?.map(
//                         (amenity: any, index: number) => (
//                           <div className="flex gap-2" key={amenity?.id}>
//                             {/* <span className="text-gold text-[24px]">
//                             <IoPeopleOutline />
//                           </span> */}
//                             <Image
//                               src={amenity?.image?.original_url || defaultimg}
//                               width={50}
//                               height={50}
//                               alt="location"
//                               className="w-5 h-5"
//                             />
//                             <span className="text-white text-sm lg:text-base">
//                               {" "}
//                               {amenity?.name}
//                             </span>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <span className="w-full block font-light mx-auto" />
//                 <div className="flex p-4 w-full justify-between border-t border-[#ffffff20]">
//                   <div className="flex flex-col text-[#CAB16C]">
//                     <span className="text-gold text-[15px] sm:text-[19px] lg:text-[24px]">
//                       {item?.price_per_night} {t("sar")}
//                     </span>
//                     <span className="text-white text-[13px]">
//                       {t("for1night")}
//                     </span>
//                   </div>
//                   <div className="flex gap-4">
//                     <MainButton
//                       type="button"
//                       className="inline-flex items-center max-lg:text-[14px] justify-center h-[48px] px-5 lg:px-9 bg-transparent border border-white text-[#CAB16C] rounded-[40px] hover:bg-[#CAB16C] hover:text-white transition-colors"
//                       onClick={() => {
//                         setSelectedRoom(item);
//                         openModal("room");
//                       }}
//                     >
//                       {t("show_details")}
//                     </MainButton>
//                     <MainButton
//                       type="button"
//                       styleMe
//                       onClick={() => {
//                         setSelectedRoom(item);
//                         openModal("reservation");
//                       }}
//                     >
//                       {t("add_to_card")}
//                     </MainButton>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="flex flex-col items-center justify-center py-10 text-center">
//               <Icon icon="mdi:room-search" className="text-[64px] text-gold mb-4" />
//               <p className="text-white text-[18px] mb-2">{t("no_rooms_available")}</p>
//               <p className="text-white text-[14px] opacity-70 max-w-md">{t("try_different_search")}</p>
//             </div>
//           )}
//         </div>
//       </Container>

//       {/* Image Slider Modal */}
//       {isModalOpen === "room" && (
//         <div className="fixed z-[99] flex items-center justify-center bg-black/80">
//           {/* --------------- visible for mobile & visible for desktop --------------- */}
//           <div className="fixed flex top-0 flex-col inset-0 z-50 items-center justify-center bg-black/90">
//             <Container className="!p-5 h-[calc(100vh-50px)] overflow-y-auto max-w-5xl bg-[#1C1B19] rounded-3xl">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
//                 aria-label="Close"
//               >
//                 <Icon icon="mdi:close" className="text-2xl" />
//               </button>

//               <div className="w-full h-2/3">
//                 <HotelImageGrid
//                   cardStyle
//                   images={selectedRoom?.images || []}
//                   openModal={() => {
//                     openModal("slider");
//                   }}
//                   showPhotoText={t("Show50photo")}
//                   fallbackImages={{
//                     main: pic1,
//                     others: pic5,
//                   }}
//                   isOriginalUrl={true}
//                 />

//                 <div className="flex flex-col  w-full ">
//                   <div className="p-4">
//                     <h3 className="mb-2 text-white text-[24px] font-medium">
//                       {selectedRoom?.room_type?.name}
//                     </h3>
//                     <p className="mb-2 text-white text-[14px] lg:text-[16px] font-light">
//                       {selectedRoom?.room_type?.description}
//                     </p>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
//                       {selectedRoom?.room_type?.amenities?.map((item: any) => (
//                         <div key={item?.id} className="flex items-center gap-3">
//                           <Image
//                             src={item?.image?.original_url || defaultimg}
//                             width={50}
//                             height={50}
//                             alt="icon"
//                             className="w-5 h-5"
//                           />
//                           <span className="text-gold text-[14px] lg:text-[16px] font-light text-white">
//                             {item?.name}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex p-4 w-full justify-between border-t border-[#ffffff20]">
//                       <div className="flex flex-col text-[#CAB16C]">
//                         <span className="text-gold text-[15px] sm:text-[19px] lg:text-[24px]">
//                           {selectedRoom?.price_per_night} {t("sar")}
//                         </span>
//                         <span className="text-white text-[13px]">
//                           {t("for1night")}
//                         </span>
//                       </div>
//                       <div
//                         className="flex gap-4"
//                         onClick={() => {
//                           openModal("reservation");
//                         }}
//                       >
//                         <MainButton type="button" styleMe>
//                           {/* className="text-gold cursor-pointer rounded-4xl py-[12px] px-[53px] border border-grb " */}
//                           {t("add_to_card")}
//                         </MainButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Container>
//           </div>
//         </div>
//       )}

//       {/* Image Slider Modal */}
//       {isModalOpen === "slider" && (
//         <ImageModal
//           images={selectedRoom?.images || []}
//           onClose={() => openModal("room")}
//           className="bg-black"
//         />
//       )}

//       {/* reservation Modal */}
//       {isModalOpen === "reservation" && (
//         <ReservationModal
//           defaultValues={selectedRoom}
//           onClose={() => closeModal()}
//           className="bg-black"
//         />
//       )}
//     </>
//   );
// };
// export default Rooms;
