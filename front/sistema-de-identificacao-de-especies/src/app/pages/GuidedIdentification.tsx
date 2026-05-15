import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { questionsData, type Question } from "../data/mockData";
import { toast } from "sonner";

export interface HistoryItem {
  questionId: string;
  questionText: string;
  selectedOption: {
    id: string;
    text: string;
  };
}

export default function GuidedIdentification() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're resuming from a history
  const resumeState = location.state as { resumeFromHistory?: HistoryItem[]; questionId?: string } | null;
  
  const [selectedClass, setSelectedClass] = useState<string | null>(
    resumeState?.questionId ? "Arachnida" : null
  );
  const [tempClassSelection, setTempClassSelection] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    resumeState?.questionId || "c1"
  );
  const [history, setHistory] = useState<HistoryItem[]>(
    resumeState?.resumeFromHistory || []
  );
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const currentQuestion = questionsData.find(q => q.id === currentQuestionId);
  const progress = ((history.length + 1) / (questionsData.length + 1)) * 100;

  const handleStartIdentification = () => {
    if (!tempClassSelection) {
      toast.error("Por favor, selecione uma classe antes de continuar");
      return;
    }
    setSelectedClass(tempClassSelection);
    toast.success(`Classe ${tempClassSelection} selecionada! Iniciando identificação...`);
  };

  const handleOptionSelect = (option: Question["options"][0]) => {
    const newHistoryItem: HistoryItem = {
      questionId: currentQuestionId,
      questionText: currentQuestion?.text || "",
      selectedOption: {
        id: option.id,
        text: option.text
      }
    };

    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);
    setDirection("forward");

    if (option.resultSpeciesId) {
      toast.success("Identificação concluída!");
      setTimeout(() => {
        navigate(`/result/${option.resultSpeciesId}`, { 
          state: { identificationHistory: updatedHistory } 
        });
      }, 500);
    } else if (option.nextQuestionId) {
      setCurrentQuestionId(option.nextQuestionId);
    }
  };

  const handleBack = () => {
    if (history.length === 0) {
      setSelectedClass(null);
      return;
    }

    const lastItem = history[history.length - 1];
    setCurrentQuestionId(lastItem.questionId);
    setHistory(history.slice(0, -1));
    setDirection("backward");
  };

  const handleHistoryClick = (index: number) => {
    const item = history[index];
    setCurrentQuestionId(item.questionId);
    setHistory(history.slice(0, index));
    setDirection("backward");
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-4">
            Chave não encontrada
          </h2>
          <p className="font-['Jaldi',sans-serif] text-gray-600 mb-6">
            A chave de identificação solicitada não está disponível.
          </p>
          <Button onClick={() => navigate("/")} className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]">
            Voltar ao Início
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => selectedClass ? handleBack() : navigate("/")}
            className="mb-4 font-['Jaldi',sans-serif]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {!selectedClass ? "Voltar ao início" : history.length === 0 ? "Voltar à seleção de classe" : "Voltar"}
          </Button>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
                Identificação Guiada
              </h2>
              {selectedClass && (
                <span className="font-['Jaldi',sans-serif] text-sm text-gray-600">
                  Etapa {history.length + 1}
                </span>
              )}
            </div>
            {selectedClass && <Progress value={progress} className="h-2" />}
          </div>
        </div>

        {/* Class Selection - Show when no class is selected */}
        {!selectedClass && (
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
                {selectedClass && (
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
                  <Select value={tempClassSelection} onValueChange={(value) => setTempClassSelection(value)}>
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

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={handleStartIdentification}
                  disabled={!tempClassSelection}
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
              <Card className="p-6 bg-[#798e3f]/5 border-[#798e3f]/20">
                <p className="font-['Jaldi',sans-serif] text-gray-700 text-center">
                  💡 <strong>Dica:</strong> Este sistema é especializado na identificação de aranhas migalomorfas. 
                  Certifique-se de que seu espécime pertence à classe Arachnida antes de prosseguir.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Show questions only when class is selected */}
        {selectedClass && (
          <>
            {/* History Timeline */}
            {history.length > 0 && (
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
                    {history.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistoryClick(index)}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 hover:border-[#798e3f] group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#798e3f] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Jaldi',sans-serif] text-sm text-gray-600 truncate">
                              {item.questionText}
                            </p>
                            <p className="font-['Jaldi',sans-serif] text-base font-semibold text-gray-900 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#798e3f]" />
                              {item.selectedOption.text}
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

            {/* Current Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionId}
                initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white shadow-lg border-2 border-gray-200">
                  {currentQuestion.category && (
                    <div className="inline-block px-4 py-2 rounded-full bg-[#798e3f]/10 text-[#798e3f] font-['Jaldi',sans-serif] text-sm font-semibold mb-6">
                      {currentQuestion.category}
                    </div>
                  )}
                  
                  <h3 className="font-['JejuHallasan',sans-serif] text-3xl lg:text-4xl text-gray-900 mb-8">
                    {currentQuestion.text}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleOptionSelect(option)}
                        className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-[#798e3f] transition-all hover:shadow-xl bg-white"
                      >
                        {option.imageUrl && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={option.imageUrl}
                              alt={option.text}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h4 className="font-['Jaldi',sans-serif] text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
                            {option.text}
                            <ArrowRight className="w-5 h-5 text-[#798e3f] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          {option.description && (
                            <p className="font-['Jaldi',sans-serif] text-gray-600 text-left">
                              {option.description}
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