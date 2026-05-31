import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, MapPin, CheckCircle2, History, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { getEspecie } from "../services/api";
import type { Especie } from "../types/api";
import { type ItemHistorico } from "./GuidedIdentification";

export default function SpeciesResult() {
  const { speciesId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [especie, setEspecie] = useState<Especie | null>(null);
  const [carregando, setCarregando] = useState(true);
  const historicoIdentificacao = (location.state as { historicoIdentificacao?: ItemHistorico[] })?.historicoIdentificacao || [];

  useEffect(() => {
    if (speciesId) {
      carregarEspecie(parseInt(speciesId));
    }
  }, [speciesId]);

  const carregarEspecie = async (id: number) => {
    setCarregando(true);
    try {
      const dados = await getEspecie(id);
      setEspecie(dados);
    } catch (erro) {
      console.error("Erro ao carregar espécie:", erro);
      setEspecie(null);
    } finally {
      setCarregando(false);
    }
  };

  const voltarParaEtapa = (indiceEtapa: number) => {
    // Navegar de volta para identificação guiada com o histórico até aquele ponto
    const historicoAteEtapa = historicoIdentificacao.slice(0, indiceEtapa);
    const chaveParaRetomar = historicoIdentificacao[indiceEtapa]?.idChave;

    navigate("/guided", {
      state: {
        retornarDoHistorico: historicoAteEtapa,
        idChave: chaveParaRetomar
      }
    });
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 text-[#798e3f] animate-spin mx-auto mb-4" />
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-4">
            Carregando espécie...
          </h2>
          <p className="font-['Jaldi',sans-serif] text-gray-600">
            Aguarde enquanto carregamos os dados da espécie.
          </p>
        </Card>
      </div>
    );
  }

  if (!especie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-gray-900 mb-4">
            Espécie não encontrada
          </h2>
          <Button onClick={() => navigate("/")} className="font-['Jaldi',sans-serif]">
            Voltar ao início
          </Button>
        </Card>
      </div>
    );
  }

  // const itensTaxonomia = [
  //   { label: "Reino", value: especie.reino, color: "bg-blue-100 text-blue-800" },
  //   { label: "Filo", value: especie.filo, color: "bg-purple-100 text-purple-800" },
  //   { label: "Classe", value: especie.classe, color: "bg-pink-100 text-pink-800" },
  //   { label: "Ordem", value: especie.ordem, color: "bg-orange-100 text-orange-800" },
  //   { label: "Família", value: especie.familia, color: "bg-yellow-100 text-yellow-800" },
  //   { label: "Gênero", value: especie.genero, color: "bg-green-100 text-green-800" },
  //   { label: "Espécie", value: especie.especie, color: "bg-teal-100 text-teal-800" },
  // ];

    const itensTaxonomia = [
    { label: "Reino", value: especie.reino, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Filo", value: especie.filo, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Classe", value: especie.classe, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Ordem", value: especie.ordem, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Família", value: especie.familia, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Gênero", value: especie.genero, color: "bg-transparent text-gray-600 border border-gray-300" },
    { label: "Espécie", value: especie.especie, color: "bg-transparent text-gray-600 border border-gray-300"},
  ];

  // Parse características que vem como string do backend
  const arrayCaracteristicas = especie.caracteristicas
    ? especie.caracteristicas.split(',').map(c => c.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="font-['Jaldi',sans-serif]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </motion.div>

        {/* Success Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 text-green-800 font-['Jaldi',sans-serif] text-lg font-semibold">
            <CheckCircle2 className="w-6 h-6" />
            Identificação Concluída!
          </div>
        </motion.div>

        {/* Seção de Histórico da Identificação */}
        {historicoIdentificacao.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="p-8 border-2 border-[#798e3f]/30 bg-gradient-to-br from-white to-[#798e3f]/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#798e3f] flex items-center justify-center">
                  <History className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-['JejuHallasan',sans-serif] text-3xl text-[#798e3f]">
                    Histórico da Identificação
                  </h2>
                  <p className="font-['Jaldi',sans-serif] text-gray-600">
                    Clique em qualquer etapa para revisar ou mudar sua escolha
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {historicoIdentificacao.map((item, indice) => (
                  <motion.button
                    key={indice}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + indice * 0.05 }}
                    onClick={() => voltarParaEtapa(indice)}
                    className="group w-full text-left relative overflow-hidden"
                  >
                    <Card className="p-5 border-2 border-gray-200 hover:border-[#798e3f] transition-all duration-300 hover:shadow-lg bg-white">
                      <div className="flex items-center gap-4">
                        {/* Número da Etapa */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] text-white flex items-center justify-center text-lg font-bold shrink-0">
                          {indice + 1}
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          {/* Chave */}
                          <div className="mb-2">
                            <p className="font-['Jaldi',sans-serif] text-sm text-gray-500 mb-1">
                              Chave {indice + 1}
                            </p>
                            <p className="font-['Jaldi',sans-serif] text-base font-semibold text-gray-900 group-hover:text-[#798e3f] transition-colors">
                              {item.textoChave}
                            </p>
                          </div>

                          {/* Resposta Selecionada - Escondida por padrão, mostrada no hover */}
                          <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
                            <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                              <CheckCircle2 className="w-5 h-5 text-[#798e3f] shrink-0 mt-0.5" />
                              <div>
                                <p className="font-['Jaldi',sans-serif] text-xs text-gray-500 uppercase tracking-wide">
                                  Sua escolha:
                                </p>
                                <p className="font-['Jaldi',sans-serif] text-base font-bold text-[#798e3f]">
                                  {item.opcaoSelecionada.texto}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ícone de Ação */}
                        <div className="shrink-0 flex items-center gap-2">
                          <Badge className="bg-gray-100 text-gray-700 group-hover:bg-[#798e3f] group-hover:text-white transition-colors font-['Jaldi',sans-serif]">
                            {item.opcaoSelecionada.texto}
                          </Badge>
                          <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-[#798e3f] group-hover:rotate-180 transition-all duration-300" />
                        </div>
                      </div>
                    </Card>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg border border-[#798e3f]/20 bg-[#798e3f]">
                <p className="font-['Jaldi',sans-serif] text-sm text-center text-[#ffffff]">
                  <strong>Dica:</strong> Passe o mouse sobre cada etapa para ver mais detalhes da sua escolha
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-4 border-[#798e3f] shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={especie.imgURL}
                  alt={especie.nomeComum}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Nomes */}
            <div>
              <h1 className="font-['JejuHallasan',sans-serif] text-5xl text-[#798e3f] mb-2">
                {especie.nomeComum}
              </h1>
              <p className="font-['Jaldi',sans-serif] text-2xl text-gray-600 italic">
                {especie.nomeCientifico}
              </p>
            </div>

            <Separator />

            {/* Habitat */}
            <Card className="p-5 bg-[#798e3f]/5 border-[#798e3f]/20">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-[#798e3f] shrink-0 mt-1" />
                <div>
                  <h3 className="font-['Jaldi',sans-serif] text-lg font-bold text-gray-900 mb-2">
                    Habitat Natural
                  </h3>
                  <p className="font-['Jaldi',sans-serif] text-gray-700">
                    {especie.habitat}
                  </p>
                </div>
              </div>
            </Card>

            {/* Descrição */}
            <Card className="p-5 border-2">
              <div className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-[#798e3f] shrink-0 mt-1" />
                <div>
                  <h3 className="font-['Jaldi',sans-serif] text-lg font-bold text-gray-900 mb-2">
                    Descrição
                  </h3>
                  <p className="font-['Jaldi',sans-serif] text-gray-700 leading-relaxed">
                    {especie.descricao}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Taxonomy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-8 border-2">
            <h2 className="font-['JejuHallasan',sans-serif] text-3xl text-[#798e3f] mb-6">
              Classificação Taxonômica Completa
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {itensTaxonomia.map((item, indice) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + indice * 0.05 }}
                >
                  <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-[#798e3f] transition-colors bg-[#798e3f]">
                    <p className="font-['Jaldi',sans-serif] text-sm mb-1 text-[#ffffff]">
                      {item.label}
                    </p>
                    <Badge className={`${item.color} font-['Jaldi',sans-serif] px-3 py-1 text-[20px] text-[#ffffff]`}>
                      {item.value}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Characteristics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-8 border-2">
            <h2 className="font-['JejuHallasan',sans-serif] text-3xl text-[#798e3f] mb-6">
              Características Principais
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {arrayCaracteristicas.map((caracteristica, indice) => (
                <motion.div
                  key={indice}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + indice * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#798e3f] shrink-0 mt-0.5" />
                  <p className="font-['Jaldi',sans-serif] text-gray-800">
                    {caracteristica}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/guided">
            <Button
              size="lg"
              className="bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >Nova Identificação Guiada</Button>
          </Link>
          <Link to="/filter">
            <Button
              size="lg"
              variant="outline"
              className="font-['Jaldi',sans-serif] text-lg px-8 py-6 rounded-xl border-2"
            >
              Buscar por Filtros
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}