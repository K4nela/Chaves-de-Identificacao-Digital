import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Filter, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { getEspecies } from "../services/api";
import type { Especie } from "../types/api";
import { toast } from "sonner";

export default function FilterSearch() {
  const navigate = useNavigate();
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [niveisTaxonomicos, setNiveisTaxonomicos] = useState({
    reino: [] as string[],
    filo: [] as string[],
    classe: [] as string[],
    ordem: [] as string[],
    familia: [] as string[],
    genero: [] as string[]
  });
  const [filtros, setFiltros] = useState({
    reino: "",
    filo: "",
    classe: "",
    ordem: "",
    familia: "",
    genero: ""
  });

  useEffect(() => {
    carregarEspecies();
  }, []);

  const carregarEspecies = async () => {
    setCarregando(true);
    try {
      const dados = await getEspecies();
      setEspecies(dados);

      // Extrair valores únicos para os filtros
      const valoresUnicos = {
        reino: [...new Set(dados.map(e => e.reino))],
        filo: [...new Set(dados.map(e => e.filo))],
        classe: [...new Set(dados.map(e => e.classe))],
        ordem: [...new Set(dados.map(e => e.ordem))],
        familia: [...new Set(dados.map(e => e.familia))],
        genero: [...new Set(dados.map(e => e.genero))]
      };
      setNiveisTaxonomicos(valoresUnicos);
    } catch (erro) {
      console.error("Erro ao carregar espécies:", erro);
      toast.error("Erro ao carregar espécies");
    } finally {
      setCarregando(false);
    }
  };

  const alterarFiltro = (nivel: string, valor: string) => {
    setFiltros(anterior => ({
      ...anterior,
      [nivel]: valor
    }));
  };

  const buscar = () => {
    const filtrosAtivos = Object.entries(filtros).filter(([_, valor]) => valor !== "");

    if (filtrosAtivos.length === 0) {
      toast.error("Selecione pelo menos um filtro para buscar");
      return;
    }

    const especiesFiltradas = especies.filter(especie => {
      return filtrosAtivos.every(([chave, valor]) => {
        const mapaCampos: Record<string, keyof Especie> = {
          reino: "reino",
          filo: "filo",
          classe: "classe",
          ordem: "ordem",
          familia: "familia",
          genero: "genero"
        };
        const campo = mapaCampos[chave];
        return especie[campo].toLowerCase() === valor.toLowerCase();
      });
    });

    if (especiesFiltradas.length === 0) {
      toast.error("Nenhuma espécie encontrada com esses filtros");
      return;
    }

    if (especiesFiltradas.length === 1) {
      toast.success("Espécie encontrada!");
      navigate(`/result/${especiesFiltradas[0].id}`);
    } else {
      toast.success(`${especiesFiltradas.length} espécies encontradas!`);
      // Por enquanto, navegar para o primeiro resultado
      navigate(`/result/${especiesFiltradas[0].id}`);
    }
  };

  const limparFiltros = () => {
    setFiltros({
      reino: "",
      filo: "",
      classe: "",
      ordem: "",
      familia: "",
      genero: ""
    });
    toast.info("Filtros limpos");
  };

  const contagemFiltrosAtivos = Object.values(filtros).filter(v => v !== "").length;

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <Loader2 className="w-12 h-12 text-[#798e3f] animate-spin mx-auto mb-4" />
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-4">
            Carregando espécies...
          </h2>
          <p className="font-['Jaldi',sans-serif] text-gray-600">
            Aguarde enquanto carregamos o banco de dados.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] mb-6">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['JejuHallasan',sans-serif] text-4xl lg:text-5xl text-[#798e3f] mb-4">
              Buscar por Filtros
            </h1>
            <p className="font-['Jaldi',sans-serif] text-xl text-gray-600 max-w-2xl mx-auto">
              Utilize a classificação taxonômica para encontrar espécies específicas
            </p>
          </div>

          {/* Filter Card */}
          <Card className="p-8 bg-white shadow-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Filter className="w-6 h-6 text-[#798e3f]" />
                <h2 className="font-['Jaldi',sans-serif] text-2xl font-bold text-gray-900">
                  Filtros de Classificação
                </h2>
              </div>
              {contagemFiltrosAtivos > 0 && (
                <div className="px-4 py-2 rounded-full bg-[#798e3f] text-white font-['Jaldi',sans-serif] text-sm font-semibold">
                  {contagemFiltrosAtivos} {contagemFiltrosAtivos === 1 ? "filtro ativo" : "filtros ativos"}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Reino */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Reino
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Kingdom)</span>
                </label>
                <Select value={filtros.reino} onValueChange={(valor) => alterarFiltro("reino", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione o reino" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.reino.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Filo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Filo
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Phylum)</span>
                </label>
                <Select value={filtros.filo} onValueChange={(valor) => alterarFiltro("filo", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione o filo" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.filo.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Classe */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Classe
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Class)</span>
                </label>
                <Select value={filtros.classe} onValueChange={(valor) => alterarFiltro("classe", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione a classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.classe.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Ordem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Ordem
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Order)</span>
                </label>
                <Select value={filtros.ordem} onValueChange={(valor) => alterarFiltro("ordem", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione a ordem" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.ordem.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Família */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Família
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Family)</span>
                </label>
                <Select value={filtros.familia} onValueChange={(valor) => alterarFiltro("familia", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione a família" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.familia.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Gênero */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block mb-2">
                  <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                    Gênero
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Genus)</span>
                </label>
                <Select value={filtros.genero} onValueChange={(valor) => alterarFiltro("genero", valor)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base border border-gray-300">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisTaxonomicos.genero.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={buscar}
                disabled={contagemFiltrosAtivos === 0}
                className="flex-1 bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Espécie
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={limparFiltros}
                variant="outline"
                className="sm:w-auto font-['Jaldi',sans-serif] text-lg h-14 rounded-xl border-2"
              >
                Limpar Filtros
              </Button>
            </div>
          </Card>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Card className="p-6 bg-[#798e3f]/5 border-[#798e3f]/20">
              <p className="font-['Jaldi',sans-serif] text-gray-700 text-center">
                <strong>Dica:</strong> Quanto mais filtros você selecionar, mais específico será o resultado. 
                Comece com Reino e vá refinando aos poucos.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}