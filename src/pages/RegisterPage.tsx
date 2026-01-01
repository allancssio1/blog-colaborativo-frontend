import { RegisterForm } from "../components/Auth/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo para começar a postar
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
