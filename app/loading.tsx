import Logo from "@/public/Ruw.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-[200px] h-[120px]">
        <Image
          src={Logo}
          alt="loading"
          fill
          className="object-contain animate-bounce"
          priority
        />
      </div>
    </div>
  );
}
