import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Search, Compass, Settings, Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const estaAtivo = (caminho: string) => {
    if (caminho === "/") {
      return location.pathname === caminho;
    }
    return location.pathname.startsWith(caminho);
  };

  // Verificar se está logado e obter nome do usuário
  const estaAutenticado = sessionStorage.getItem("isAuthenticated") === "true";
  const usuarioLogado = estaAutenticado
    ? JSON.parse(sessionStorage.getItem("usuario") || "{}")
    : null;
  const nomeUsuario = usuarioLogado?.nome || "Administrador";
  const estaNoPainelAdmin = location.pathname === "/admin";

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <h1 className="font-['JejuHallasan',sans-serif] text-3xl lg:text-4xl text-[#798e3f] group-hover:text-[#748f27] transition-colors">
              GuessKeys
            </h1>
          </Link>

          {estaAutenticado && estaNoPainelAdmin && (
            <div className="hidden md:block flex-1 ml-8">
              <p className="font-['JejuHallasan',sans-serif] text-xl text-gray-700">
                Bem vindo, {nomeUsuario}!
              </p>
            </div>
          )}

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/guided"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                estaAtivo("/guided")
                  ? "bg-[#798e3f] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Compass className="w-5 h-5" />
              <span className="font-['Jaldi',sans-serif] text-lg">Identificação Guiada</span>
            </Link>

            <Link
              to="/filter"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                estaAtivo("/filter")
                  ? "bg-[#798e3f] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="font-['Jaldi',sans-serif] text-lg">Buscar por Filtros</span>
            </Link>

            <Link
              to="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                estaAtivo("/admin") || estaAtivo("/login")
                  ? "bg-[#798e3f] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {menuAberto ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuAberto && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {estaAutenticado && estaNoPainelAdmin && (
              <div className="px-4 pb-4 border-b border-gray-200 mb-2">
                <p className="font-['JejuHallasan',sans-serif] text-lg text-gray-700">
                  Bem vindo, {nomeUsuario}!
                </p>
              </div>
            )}
            <nav className="flex flex-col gap-2">
              <Link
                to="/guided"
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  estaAtivo("/guided")
                    ? "bg-[#798e3f] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Compass className="w-5 h-5" />
                <span className="font-['Jaldi',sans-serif] text-lg">Identificação Guiada</span>
              </Link>

              <Link
                to="/filter"
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  estaAtivo("/filter")
                    ? "bg-[#798e3f] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="font-['Jaldi',sans-serif] text-lg">Buscar por Filtros</span>
              </Link>

              <Link
                to="/login"
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  estaAtivo("/admin") || estaAtivo("/login")
                    ? "bg-[#798e3f] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-['Jaldi',sans-serif] text-lg">Admin</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}