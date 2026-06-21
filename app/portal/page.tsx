import { redirect } from "next/navigation";

// Le portail client est accessible via /portal/[token].
// /portal seul n'est pas une URL valide.
export default function PortalIndexPage() {
  redirect("/login");
}
