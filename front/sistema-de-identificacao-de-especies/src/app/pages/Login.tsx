import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, LogIn, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - in production, this should be done server-side
    if (username === "admin" && password === "admin123") {
      setIsLoading(true);
      toast.success("Login realizado com sucesso!");
      
      // Store authentication in sessionStorage
      sessionStorage.setItem("isAuthenticated", "true");
      
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    } else {
      toast.error("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 font-['Jaldi',sans-serif]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>

        <Card className="p-8 shadow-2xl border-2 border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['JejuHallasan',sans-serif] text-3xl text-[#798e3f] mb-2">
              Acesso Administrativo
            </h1>
            <p className="font-['Jaldi',sans-serif] text-gray-600">
              Entre com suas credenciais para acessar o painel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="font-['Jaldi',sans-serif] text-base">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="mt-2 h-12 font-['Jaldi',sans-serif]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-['Jaldi',sans-serif] text-base">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="mt-2 h-12 font-['Jaldi',sans-serif]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                "Entrando..."
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-['Jaldi',sans-serif] text-sm text-gray-600 text-center">
              <strong>Credenciais de teste:</strong><br />
              Usuário: admin | Senha: admin123
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
