import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Filter, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { iniciarGuia, getChave } from "../services/api";
import type { ChaveComOpcoes } from "../types/api";
import { toast } from "sonner";

export interface ItemHistorico {
  idChave: number;
  textoChave: string;
  opcaoSelecionada: {
    id: number;
    texto: string;
  };
}

export default function GuidedIdentification() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se estamos retomando de um histórico
  const estadoRetomada = location.state as { retornarDoHistorico?: ItemHistorico[]; idChave?: number } | null;

  const [classeSelecionada, setClasseSelecionada] = useState<string | null>(
    estadoRetomada?.idChave ? "Arachnida" : null
  );
  const [selecaoClasseTemporaria, setSelecaoClasseTemporaria] = useState<string>("");
  const [idChaveAtual, setIdChaveAtual] = useState<number | null>(
    estadoRetomada?.idChave || null
  );
  const [historico, setHistorico] = useState<ItemHistorico[]>(
    estadoRetomada?.retornarDoHistorico || []
  );
  const [direcao, setDirecao] = useState<"forward" | "backward">("forward");
  const [chaveAtual, setChaveAtual] = useState<ChaveComOpcoes | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [totalChaves, setTotalChaves] = useState(11); // Estimativa inicial

  const progresso = totalChaves > 0 ? ((historico.length + 1) / totalChaves) * 100 : 0;

  // Carregar primeira chave ao iniciar
  useEffect(() => {
    if (classeSelecionada && idChaveAtual === null) {
      carregarPrimeiraChave();
    } else if (idChaveAtual !== null) {
      carregarChave(idChaveAtual);
    }
  }, [classeSelecionada, idChaveAtual]);

  const carregarPrimeiraChave = async () => {
    setCarregando(true);
    try {
      const dados = await iniciarGuia();
      setIdChaveAtual(dados.id);
      setChaveAtual({
        id: dados.id,
        texto: dados.texto,
        categoria: dados.categoria,
        opcoes: dados.opcoes.map(opt => ({
          id: opt.id,
          texto: opt.texto,
          descricao: "",
          imgURL: "",
          id_chave: dados.id,
          id_especie: opt.id_especie,
          id_proxima_chave: opt.id_proxima_chave
        }))
      });
    } catch (erro) {
      console.error("Erro ao carregar primeira chave:", erro);
      toast.error("Erro ao carregar chave de identificação");
    } finally {
      setCarregando(false);
    }
  };

  const carregarChave = async (id: number) => {
    setCarregando(true);
    try {
      const dados = await getChave(id);
      setChaveAtual(dados);
    } catch (erro) {
      console.error("Erro ao carregar chave:", erro);
      toast.error("Erro ao carregar chave de identificação");
    } finally {
      setCarregando(false);
    }
  };

  const iniciarIdentificacao = () => {
    if (!selecaoClasseTemporaria) {
      toast.error("Por favor, selecione uma classe antes de continuar");
      return;
    }
    setClasseSelecionada(selecaoClasseTemporaria);
    toast.success(`Classe ${selecaoClasseTemporaria} selecionada! Iniciando...`);
  };

  const selecionarOpcao = (opcao: ChaveComOpcoes["opcoes"][0]) => {
    if (!chaveAtual || idChaveAtual === null) return;

    const novoItemHistorico: ItemHistorico = {
      idChave: idChaveAtual,
      textoChave: chaveAtual.texto,
      opcaoSelecionada: {
        id: opcao.id,
        texto: opcao.texto
      }
    };

    const historicoAtualizado = [...historico, novoItemHistorico];
    setHistorico(historicoAtualizado);
    setDirecao("forward");

    if (opcao.id_especie) {
      toast.success("Identificação concluída!");
      setTimeout(() => {
        navigate(`/result/${opcao.id_especie}`, {
          state: { historicoIdentificacao: historicoAtualizado }
        });
      }, 500);
    } else if (opcao.id_proxima_chave) {
      setIdChaveAtual(opcao.id_proxima_chave);
    }
  };

  const voltar = () => {
    if (historico.length === 0) {
      setClasseSelecionada(null);
      setIdChaveAtual(null);
      setChaveAtual(null);
      return;
    }

    const ultimoItem = historico[historico.length - 1];
    setIdChaveAtual(ultimoItem.idChave);
    setHistorico(historico.slice(0, -1));
    setDirecao("backward");
  };

  const clicarHistorico = (indice: number) => {
    const item = historico[indice];
    setIdChaveAtual(item.idChave);
    setHistorico(historico.slice(0, indice));
    setDirecao("backward");
  };

  // Estado de carregamento
  if (carregando && classeSelecionada && !chaveAtual) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <Loader2 className="w-12 h-12 text-[#798e3f] animate-spin mx-auto mb-4" />
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-4">
            Carregando chave...
          </h2>
          <p className="font-['Jaldi',sans-serif] text-gray-600">
            Aguarde enquanto carregamos a chave de identificação.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => classeSelecionada ? voltar() : navigate("/")}
            className="mb-4 font-['Jaldi',sans-serif]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {!classeSelecionada ? "Voltar ao início" : historico.length === 0 ? "Voltar à seleção de classe" : "Voltar"}
          </Button>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
                Identificação Guiada
              </h2>
              {classeSelecionada && (
                <span className="font-['Jaldi',sans-serif] text-sm text-gray-600">
                  Etapa {historico.length + 1}
                </span>
              )}
            </div>
            {classeSelecionada && <Progress value={progresso} className="h-2" />}
          </div>
        </div>

        {/* Seleção de Classe - Mostra quando nenhuma classe foi selecionada */}
        {!classeSelecionada && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] mb-6">
                <Filter className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-['JejuHallasan',sans-serif] text-4xl lg:text-5xl text-[#798e3f] mb-4">
                Selecione a Classe
              </h1>
              <p className="font-['Jaldi',sans-serif] text-xl text-gray-600 max-w-2xl mx-auto">
                Escolha a classe taxonômica do espécime para iniciar a identificação guiada
              </p>
            </div>

            {/* Filter Card */}
            <Card className="p-8 bg-white shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Filter className="w-6 h-6 text-[#798e3f]" />
                  <h2 className="font-['Jaldi',sans-serif] text-2xl font-bold text-gray-900">
                    Filtro de Classe
                  </h2>
                </div>
                {classeSelecionada && (
                  <div className="px-4 py-2 rounded-full bg-[#798e3f] text-white font-['Jaldi',sans-serif] text-sm font-semibold">
                    1 filtro ativo
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Classe */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block mb-2">
                    <span className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-700">
                      Classe
                    </span>
                    <span className="ml-2 text-sm text-gray-500">(Class)</span>
                  </label>
                  <Select value={selecaoClasseTemporaria} onValueChange={(valor) => setSelecaoClasseTemporaria(valor)}>
                    <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                      <SelectValue placeholder="Selecione a classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arachnida" className="font-['Jaldi',sans-serif]">
                        Arachnida
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {/* Botão de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={iniciarIdentificacao}
                  disabled={!selecaoClasseTemporaria}
                  className="flex-1 bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Iniciar Identificação
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="p-6 border-[#798e3f]/20 bg-[#798e3f]">
                <p className="font-['Jaldi',sans-serif] text-center text-[#ffffff]">
                   <strong>Dica:</strong> Este sistema é especializado na identificação de aranhas migalomorfas. 
                  Certifique-se de que seu espécime pertence à classe Arachnida antes de prosseguir.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Mostrar perguntas apenas quando a classe foi selecionada */}
        {classeSelecionada && (
          <>
            {/* Linha do Tempo do Histórico */}
            {historico.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-[#798e3f]" />
                    <h3 className="font-['Jaldi',sans-serif] text-lg font-semibold text-gray-900">
                      Suas escolhas
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {historico.map((item, indice) => (
                      <button
                        key={indice}
                        onClick={() => clicarHistorico(indice)}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 hover:border-[#798e3f] group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#798e3f] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                            {indice + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Jaldi',sans-serif] text-sm text-gray-600 truncate">
                              {item.textoChave}
                            </p>
                            <p className="font-['Jaldi',sans-serif] text-base font-semibold text-gray-900 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#798e3f]" />
                              {item.opcaoSelecionada.texto}
                            </p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#798e3f] shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Chave Atual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={idChaveAtual}
                initial={{ opacity: 0, x: direcao === "forward" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direcao === "forward" ? -50 : 50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white shadow-lg border-2 border-gray-200">
                  {chaveAtual?.categoria && (
                    <div className="inline-block px-4 py-2 rounded-full bg-[#798e3f]/10 text-[#798e3f] font-['Jaldi',sans-serif] text-sm font-semibold mb-6">
                      {chaveAtual.categoria}
                    </div>
                  )}

                  <h3 className="font-['JejuHallasan',sans-serif] text-3xl lg:text-4xl text-gray-900 mb-8">
                    {chaveAtual?.texto}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {chaveAtual?.opcoes.map((opcao, indice) => (
                      <motion.button
                        key={opcao.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: indice * 0.1 }}
                        onClick={() => selecionarOpcao(opcao)}
                        className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-[#798e3f] transition-all hover:shadow-xl bg-white"
                      >
                        {opcao.imgURL && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={opcao.imgURL}
                              alt={opcao.texto}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h4 className="font-['Jaldi',sans-serif] text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
                            {opcao.texto}
                            <ArrowRight className="w-5 h-5 text-[#798e3f] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          {opcao.descricao && (
                            <p className="font-['Jaldi',sans-serif] text-gray-600 text-left">
                              {opcao.descricao}
                            </p>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}