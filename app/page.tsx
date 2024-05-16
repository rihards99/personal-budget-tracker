import { SignInButton } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect("/login");

  // return (
  //   <main>
  //     <h1>Personal Budget Tracker</h1>
  //     <SignInButton/>
  //   </main>
  // );
}
