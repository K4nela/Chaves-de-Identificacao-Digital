import { Link } from "react-router";
import { Compass, Search, History, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function HomePage() {
  const features = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Identificação Guiada",
      description: "Responda perguntas sequenciais e descubra a espécie passo a passo"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Busca por Filtros",
      description: "Filtre por Reino, Filo, Classe, Ordem, Família e Gênero"
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Histórico de Escolhas",
      description: "Suas respostas ficam salvas e você pode voltar em qualquer etapa"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Informações Completas",
      description: "Receba classificação taxonômica completa com imagens e descrições"
    }
  ];

  const benefits = [
    "Identifique chaves através de seleção guiada",
    "Suas respostas ficam salvas em um histórico",
    "Você recebe a identificação completa com imagens"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-[#f8faf5] to-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#798e3f] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#748f27] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-['JejuHallasan',sans-serif] text-5xl lg:text-7xl text-[#748f27] mb-6 leading-tight">
                Identifique<br />
                Aranhas<br />
                Migalomorfas!
              </h2>
              
              <p className="font-['Jaldi',sans-serif] text-xl text-gray-700 mb-8 leading-relaxed">
                Faça identificações precisas de famílias de aranhas através de<br />
                chave dicotômica interativa e didática. Perfeito para<br />
                pesquisadores, estudantes e entusiastas da aracnologia!
              </p>

              <Link to="/guided">
                <Button 
                  size="lg"
                  className="bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  Iniciar identificação
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-5 border-2 border-gray-300 hover:border-[#798e3f] transition-colors">
                    <p className="font-['Jaldi',sans-serif] text-lg text-gray-800">
                      {benefit}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-['JejuHallasan',sans-serif] text-4xl lg:text-5xl text-[#798e3f] mb-4">
              Como Funciona
            </h3>
            <p className="font-['Jaldi',sans-serif] text-xl text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa para identificação de espécies de forma didática e intuitiva
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-2 hover:border-[#798e3f]">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#798e3f] to-[#748f27] flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-['Jaldi',sans-serif] text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="font-['Jaldi',sans-serif] text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#798e3f] to-[#748f27]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h3 className="font-['JejuHallasan',sans-serif] text-4xl lg:text-5xl mb-6">
              Pronto para começar?
            </h3>
            <p className="font-['Jaldi',sans-serif] text-xl mb-8 opacity-90">
              Escolha a melhor forma de identificar suas espécies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guided">
                <Button 
                  size="lg"
                  className="bg-white text-[#798e3f] hover:bg-gray-100 font-['Jaldi',sans-serif] text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Identificação Guiada
                </Button>
              </Link>
              <Link to="/filter">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-['Jaldi',sans-serif] text-lg px-8 py-6 rounded-xl transition-all"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar por Filtros
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}