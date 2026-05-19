import { Link, useLocation } from "react-router";
import { Search, Compass, Settings } from "lucide-react";

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

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

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/guided"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/guided")
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
                isActive("/filter")
                  ? "bg-[#798e3f] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="font-['Jaldi',sans-serif] text-lg">Buscar por Filtros</span>
            </Link>

            {/*<Link*/}
            {/*  to="/login"*/}
            {/*  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${*/}
            {/*    isActive("/admin") || isActive("/login")*/}
            {/*      ? "bg-[#798e3f] text-white"*/}
            {/*      : "text-gray-700 hover:bg-gray-100"*/}
            {/*  }`}*/}
            {/*>*/}
            {/*  <Settings className="w-5 h-5" />*/}
            {/*</Link>*/}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}