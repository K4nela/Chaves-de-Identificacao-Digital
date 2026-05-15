export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Jaldi',sans-serif] text-sm text-gray-600">
            © {new Date().getFullYear()} GuessKeys - Sistema de Identificação de Espécies Biológicas
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Desenvolvido para estudantes e pesquisadores</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
