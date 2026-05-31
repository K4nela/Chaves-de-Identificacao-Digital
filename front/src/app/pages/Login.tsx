import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const realizarLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!nomeUsuario.trim()) {
      toast.error("O campo Usuário é obrigatório!");
      return;
    }

    if (!senha.trim()) {
      toast.error("O campo Senha é obrigatório!");
      return;
    }

    setCarregando(true);

    try {
      // Chamar API de login
      const resposta = await login(nomeUsuario, senha);

      toast.success("Login realizado com sucesso!");

      // Armazenar autenticação no sessionStorage
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("usuario", JSON.stringify(resposta.usuario));

      setTimeout(() => {
        navigate("/admin");
        setCarregando(false);
      }, 500);
    } catch (erro: any) {
      console.error("Erro ao fazer login:", erro);
      toast.error("Usuário ou senha incorretos!");
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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

          <form onSubmit={realizarLogin} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="username" className="font-['Jaldi',sans-serif] text-base">
                  Usuário
                </Label>
                <span className="font-['Jaldi',sans-serif] text-xs text-gray-500">
                  {nomeUsuario.length}/20 caracteres
                </span>
              </div>
              <Input
                id="username"
                type="text"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                placeholder="Digite seu usuário"
                className="mt-2 h-12 font-['Jaldi',sans-serif]"
                maxLength={20}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="font-['Jaldi',sans-serif] text-base">
                  Senha
                </Label>
                <span className="font-['Jaldi',sans-serif] text-xs text-gray-500">
                  {senha.length}/20 caracteres
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="mt-2 h-12 font-['Jaldi',sans-serif] pr-12"
                  maxLength={20}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {carregando ? (
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
