"use server";
import LoginForm from "@/components/interfaces/Login/LoginForm";

export default async function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <LoginForm />
    </div>
  );
}
