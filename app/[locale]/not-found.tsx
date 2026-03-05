import ErrorComponent from "@/components/shared/ErrorComponent";
import { useTranslations } from "next-intl";
import notFoundImage from "@/public/assets/errorAndNotFound/404 error with a landscape-bro 1.svg";
import MainLink from "@/components/reusableComponent/MainLink";

export default function NotFound() {
    const t = useTranslations("error");
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <ErrorComponent
                title={t("pageNotFound")}
                des={t("pageNotFoundDesc")}
                img={notFoundImage}
            />

            <MainLink href="/" styleMe>
                {t("backHome")}
            </MainLink>
        </div>
    );
}
