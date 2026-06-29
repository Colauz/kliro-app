import { notFound } from "next/navigation";

// /portal alone is not a valid URL — the client portal lives at /portal/[token].
export default function PortalIndexPage() {
  notFound();
}
