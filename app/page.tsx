import { SignInButton } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect("/login");
}
