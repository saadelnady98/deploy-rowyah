import { redirect } from "next/navigation";
import { routing } from "../routing";

// Root-level not-found page for edge cases where locale cannot be determined
// Redirects to the default locale's not-found page
export default function RootNotFound() {
  redirect(`/${routing.defaultLocale}/not-found`);
}
