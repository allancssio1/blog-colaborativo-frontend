import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { login as loginService } from "@/services/authService"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
        toast({
            variant: "destructive",
            title: "Campos vazios",
            description: "Por favor, preencha todos os campos.",
        })
        return
    }

    setLoading(true)
    try {
      const data = await loginService(email, password)
      login(data.user, data.token)
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo de volta, ${data.user.name}!`,
      })
      navigate("/posts")
    } catch (error: any) {
        console.error(error)
        const msg = error.response?.data?.message || "Ocorreu um erro ao fazer login."
        toast({
            variant: "destructive",
            title: "Erro no login",
            description: msg,
        })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link to="/register" className="underline text-primary hover:text-primary/90">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
