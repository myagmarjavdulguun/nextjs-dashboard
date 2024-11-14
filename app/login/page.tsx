import { redirect } from "next/navigation";
import { isLoggedIn } from "../lib/data";
import LoginPage from "../ui/login";

export default async function Page() {
  const data = await isLoggedIn();

  if (data) {
    redirect('/home');
  }

  return (
    <LoginPage />
  );
}
