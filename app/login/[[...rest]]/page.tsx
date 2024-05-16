import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <SignIn path="/login" forceRedirectUrl={"/dashboard"}/>
    </div>
  );
}