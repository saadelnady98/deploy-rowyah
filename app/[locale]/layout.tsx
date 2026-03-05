import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Inter } from "next/font/google";

import { headers } from "next/headers";

import Test from "@/Test";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/providers/providers";
import { notFound } from "next/navigation";
import { routing } from "../../routing";
import { locales } from "../../navigation";
import Navbar from "@/components/layout/navBar/Navbar";
import Footer from "@/components/layout/footer/footer";
import WhatsappIcon from "@/components/whatsapp";
import AOSInitializer from "@/components/AOSInitializer";
import { getHomeData } from "@/lib/serverActions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string | any }>;
}) {
  const { locale } = await params;
  const homeData = await getHomeData(locale);
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const { locale: currentLocale } = resolvedParams;

  if (!locales.includes(currentLocale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${currentLocale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider
      // locale={currentLocale || routing.defaultLocale}
      locale={currentLocale || "ar"}
      messages={messages}
      timeZone="Asia/Dubai"
    >
      <Providers locale={currentLocale || "ar"}>
        <AOSInitializer />
        <div
          dir={currentLocale === "ar" ? "rtl" : "ltr"}
          lang={currentLocale}
          className="min-h-screen"
        >
          <Navbar data={homeData?.data?.services} />
          {children}
          <WhatsappIcon data={homeData?.data?.contact?.contacts}  />
          <Footer data={homeData?.data?.contact} />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
