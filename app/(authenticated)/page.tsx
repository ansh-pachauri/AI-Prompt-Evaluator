import { redirect } from "next/navigation";

export default function AuthenticatedRedirect() {
  redirect("/dashboard");
}
