import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { speciesData } from "../data/mockData";
import { toast } from "sonner";

const taxonomyLevels = {
  kingdom: ["Animalia"],
  phylum: ["Arthropoda"],
  class: ["Arachnida"],
  order: ["Araneae"],
  family: ["Mygalomorphae", "Actinopodidae", "Idiopidae", "Dipluridae", "Theraphosidae", "Barychelidae", "Paratropididae", "Ctenizidae", "Cyrtaucheniidae", "Microstigmatidae", "Nemesiidae"],
  genus: []
};

export default function FilterSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    kingdom: "",
    phylum: "",
    class: "",
    order: "",
    family: "",
    genus: ""
  });

  const handleFilterChange = (level: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [level]: value
    }));
  };

  const handleSearch = () => {
    const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "");
    
    if (activeFilters.length === 0) {
      toast.error("Selecione pelo menos um filtro para buscar");
      return;
    }

    const filteredSpecies = speciesData.filter(species => {
      return activeFilters.every(([key, value]) => {
        return species[key as keyof typeof species].toLowerCase() === value.toLowerCase();
      });
    });

    if (filteredSpecies.length === 0) {
      toast.error("Nenhuma espécie encontrada com esses filtros");
      return;
    }

    if (filteredSpecies.length === 1) {
      toast.success("Espécie encontrada!");
      navigate(`/result/${filteredSpecies[0].id}`);
    } else {
      toast.success(`${filteredSpecies.length} espécies encontradas!`);
      // For now, navigate to the first result
      navigate(`/result/${filteredSpecies[0].id}`);
    }
  };

  const handleReset = () => {
    setFilters({
      kingdom: "",
      phylum: "",
      class: "",
      order: "",
      family: "",
      genus: ""
    });
    toast.info("Filtros limpos");
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

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
              {activeFilterCount > 0 && (
                <div className="px-4 py-2 rounded-full bg-[#798e3f] text-white font-['Jaldi',sans-serif] text-sm font-semibold">
                  {activeFilterCount} {activeFilterCount === 1 ? "filtro ativo" : "filtros ativos"}
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
                <Select value={filters.kingdom} onValueChange={(value) => handleFilterChange("kingdom", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione o reino" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.kingdom.map(item => (
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
                <Select value={filters.phylum} onValueChange={(value) => handleFilterChange("phylum", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione o filo" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.phylum.map(item => (
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
                <Select value={filters.class} onValueChange={(value) => handleFilterChange("class", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione a classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.class.map(item => (
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
                <Select value={filters.order} onValueChange={(value) => handleFilterChange("order", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione a ordem" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.order.map(item => (
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
                <Select value={filters.family} onValueChange={(value) => handleFilterChange("family", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione a família" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.family.map(item => (
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
                <Select value={filters.genus} onValueChange={(value) => handleFilterChange("genus", value)}>
                  <SelectTrigger className="w-full h-12 font-['Jaldi',sans-serif] text-base">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxonomyLevels.genus.map(item => (
                      <SelectItem key={item} value={item} className="font-['Jaldi',sans-serif]">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={handleSearch}
                disabled={activeFilterCount === 0}
                className="flex-1 bg-[#798e3f] hover:bg-[#748f27] text-white font-['Jaldi',sans-serif] text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Espécie
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={handleReset}
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
            {/*<Card className="p-6 bg-[#798e3f]/5 border-[#798e3f]/20">*/}
            {/*  <p className="font-['Jaldi',sans-serif] text-gray-700 text-center">*/}
            {/*    💡 <strong>Dica:</strong> Quanto mais filtros você selecionar, mais específico será o resultado. */}
            {/*    Comece com Reino e vá refinando aos poucos.*/}
            {/*  </p>*/}
            {/*</Card>*/}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}