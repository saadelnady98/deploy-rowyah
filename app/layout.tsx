import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Tajawal } from "next/font/google";
import "../src/globals.css";
import "../src/swiperCustomStyles.css";
import { headers } from "next/headers";
import { routing } from "../routing";
import 'aos/dist/aos.css' 

const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({
  weight: [ "200", "300", "400", "500", "700", "800"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "ModernSkills",
  description: "Your premier destination for ModernSkills",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current locale from headers
  const headersList = await headers();
  const currentLocale =
    headersList.get("x-next-intl-locale") || routing.defaultLocale;

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`bg-white min-h-screen ${
          currentLocale === "ar" ? tajawal.className : tajawal.className
        }`}
        suppressHydrationWarning
      >
        
        {/* <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md">
          from root layout {currentLocale === "ar" ? "العربية" : "English"}
        </div> */}
        {children}
      </body>
    </html>
  );
}
