import { LoginForm } from "../components/Auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Entre na sua conta para criar e gerenciar posts
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
