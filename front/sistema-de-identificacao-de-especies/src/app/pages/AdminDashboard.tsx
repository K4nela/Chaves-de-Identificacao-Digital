import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Search, Settings, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { questionsData, speciesData, type Question, type Species } from "../data/mockData";
import { toast } from "sonner";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [isSpeciesDialogOpen, setIsSpeciesDialogOpen] = useState(false);

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    text: "",
    category: "",
    option1Text: "",
    option1Description: "",
    option1ImageUrl: "",
    option1NextQuestion: "",
    option1ResultSpecies: "",
    option2Text: "",
    option2Description: "",
    option2ImageUrl: "",
    option2NextQuestion: "",
    option2ResultSpecies: ""
  });

  // Species form state
  const [speciesForm, setSpeciesForm] = useState({
    commonName: "",
    scientificName: "",
    kingdom: "",
    phylum: "",
    class: "",
    order: "",
    family: "",
    genus: "",
    species: "",
    description: "",
    habitat: "",
    imageUrl: "",
    characteristics: ""
  });

  const handleDeleteQuestion = (id: string) => {
    toast.success("Chave removida com sucesso!");
  };

  const handleDeleteSpecies = (id: string) => {
    toast.success("Família removida com sucesso!");
  };

  const handleOpenQuestionDialog = (question?: Question) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionForm({
        text: question.text,
        category: question.category || "",
        option1Text: question.options[0]?.text || "",
        option1Description: question.options[0]?.description || "",
        option1ImageUrl: question.options[0]?.imageUrl || "",
        option1NextQuestion: question.options[0]?.nextQuestionId || "",
        option1ResultSpecies: question.options[0]?.resultSpeciesId || "",
        option2Text: question.options[1]?.text || "",
        option2Description: question.options[1]?.description || "",
        option2ImageUrl: question.options[1]?.imageUrl || "",
        option2NextQuestion: question.options[1]?.nextQuestionId || "",
        option2ResultSpecies: question.options[1]?.resultSpeciesId || ""
      });
    } else {
      setEditingQuestion(null);
      setQuestionForm({
        text: "",
        category: "",
        option1Text: "",
        option1Description: "",
        option1ImageUrl: "",
        option1NextQuestion: "",
        option1ResultSpecies: "",
        option2Text: "",
        option2Description: "",
        option2ImageUrl: "",
        option2NextQuestion: "",
        option2ResultSpecies: ""
      });
    }
    setIsQuestionDialogOpen(true);
  };

  const handleOpenSpeciesDialog = (species?: Species) => {
    if (species) {
      setEditingSpecies(species);
      setSpeciesForm({
        commonName: species.commonName,
        scientificName: species.scientificName,
        kingdom: species.kingdom,
        phylum: species.phylum,
        class: species.class,
        order: species.order,
        family: species.family,
        genus: species.genus,
        species: species.species,
        description: species.description,
        habitat: species.habitat,
        imageUrl: species.imageUrl,
        characteristics: species.characteristics.join(", ")
      });
    } else {
      setEditingSpecies(null);
      setSpeciesForm({
        commonName: "",
        scientificName: "",
        kingdom: "",
        phylum: "",
        class: "",
        order: "",
        family: "",
        genus: "",
        species: "",
        description: "",
        habitat: "",
        imageUrl: "",
        characteristics: ""
      });
    }
    setIsSpeciesDialogOpen(true);
  };

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      toast.success("Chave atualizada com sucesso!");
    } else {
      toast.success("Chave criada com sucesso!");
    }
    setIsQuestionDialogOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveSpecies = () => {
    if (editingSpecies) {
      toast.success("Família atualizada com sucesso!");
    } else {
      toast.success("Família criada com sucesso!");
    }
    setIsSpeciesDialogOpen(false);
    setEditingSpecies(null);
  };

  const filteredQuestions = questionsData.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpecies = speciesData.filter(s =>
    s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#798e3f] to-[#748f27] flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-['JejuHallasan',sans-serif] text-4xl lg:text-5xl text-[#798e3f]">
                  Painel Administrativo
                </h1>
              </div>
              <p className="font-['Jaldi',sans-serif] text-xl text-gray-600 ml-15">
                Gerencie chaves de identificação e famílias do sistema
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onLogout}
                className="font-['Jaldi',sans-serif] border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>

              <Button
                className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]"
                onClick={() => handleOpenQuestionDialog()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Chave
              </Button>

              <Button
                variant="outline"
                className="font-['Jaldi',sans-serif]"
                onClick={() => handleOpenSpeciesDialog()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Família
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-['Jaldi',sans-serif] h-12"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="questions" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="questions" className="font-['Jaldi',sans-serif]">
                Chaves ({filteredQuestions.length})
              </TabsTrigger>
              <TabsTrigger value="species" className="font-['Jaldi',sans-serif]">
                Famílias ({filteredSpecies.length})
              </TabsTrigger>
            </TabsList>

            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow border-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-[#798e3f] text-white font-['Jaldi',sans-serif]">
                            {question.id}
                          </Badge>
                          {question.category && (
                            <Badge variant="outline" className="font-['Jaldi',sans-serif]">
                              {question.category}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-['Jaldi',sans-serif] text-xl font-bold text-gray-900 mb-3">
                          {question.text}
                        </h3>
                        <div className="space-y-2">
                          <p className="font-['Jaldi',sans-serif] text-sm text-gray-600 font-semibold">
                            Opções de resposta:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {question.options.map(option => (
                              <Badge key={option.id} variant="secondary" className="font-['Jaldi',sans-serif]">
                                {option.text}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenQuestionDialog(question)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Species Tab */}
            <TabsContent value="species" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredSpecies.map((species, index) => (
                  <motion.div
                    key={species.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={species.imageUrl}
                          alt={species.commonName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-1">
                              {species.commonName}
                            </h3>
                            <p className="font-['Jaldi',sans-serif] text-gray-600 italic">
                              {species.scientificName}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenSpeciesDialog(species)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteSpecies(species.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="font-['Jaldi',sans-serif]">{species.kingdom}</Badge>
                          <Badge variant="secondary" className="font-['Jaldi',sans-serif]">{species.class}</Badge>
                          <Badge variant="outline" className="font-['Jaldi',sans-serif]">{species.family}</Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Question Dialog */}
      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
              {editingQuestion ? "Editar Chave" : "Criar Nova Chave"}
            </DialogTitle>
            <DialogDescription className="font-['Jaldi',sans-serif]">
              Preencha as informações da chave e suas duas opções de resposta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#798e3f] scrollbar-track-gray-100">
            {/* Informações Gerais */}
            <div className="space-y-4 pb-4 border-b">
              <h3 className="font-['Jaldi',sans-serif] text-lg font-bold text-[#798e3f]">
                Informações Gerais
              </h3>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                  Texto da Chave
                </label>
                <Input
                  placeholder="Ex: O espécime possui quelíceras paraxiais?"
                  className="font-['Jaldi',sans-serif]"
                  value={questionForm.text}
                  onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                  Categoria
                </label>
                <Input
                  placeholder="Ex: Morfologia, Características..."
                  className="font-['Jaldi',sans-serif]"
                  value={questionForm.category}
                  onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                />
              </div>
            </div>

            {/* Opções em Duas Colunas */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Opção 1 */}
              <div className="space-y-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="font-['Jaldi',sans-serif] text-lg font-bold text-[#798e3f] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#798e3f] text-white flex items-center justify-center text-sm">1</span>
                  Primeira Opção
                </h3>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Texto
                  </label>
                  <Input
                    placeholder="Ex: Sim"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option1Text}
                    onChange={(e) => setQuestionForm({ ...questionForm, option1Text: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Descrição
                  </label>
                  <Textarea 
                    placeholder="Descrição detalhada da opção..."
                    className="font-['Jaldi',sans-serif] h-24 bg-white"
                    value={questionForm.option1Description}
                    onChange={(e) => setQuestionForm({ ...questionForm, option1Description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    URL da Imagem
                  </label>
                  <Input
                    placeholder="https://..."
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option1ImageUrl}
                    onChange={(e) => setQuestionForm({ ...questionForm, option1ImageUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Próxima Chave (ID)
                  </label>
                  <Input
                    placeholder="Ex: c2"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option1NextQuestion}
                    onChange={(e) => setQuestionForm({ ...questionForm, option1NextQuestion: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Espécie Resultado (ID)
                  </label>
                  <Input
                    placeholder="Ex: theraphosidae"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option1ResultSpecies}
                    onChange={(e) => setQuestionForm({ ...questionForm, option1ResultSpecies: e.target.value })}
                  />
                </div>
              </div>

              {/* Opção 2 */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="font-['Jaldi',sans-serif] text-lg font-bold text-blue-700 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
                  Segunda Opção
                </h3>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Texto
                  </label>
                  <Input
                    placeholder="Ex: Não"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option2Text}
                    onChange={(e) => setQuestionForm({ ...questionForm, option2Text: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Descrição
                  </label>
                  <Textarea 
                    placeholder="Descrição detalhada da opção..."
                    className="font-['Jaldi',sans-serif] h-24 bg-white"
                    value={questionForm.option2Description}
                    onChange={(e) => setQuestionForm({ ...questionForm, option2Description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    URL da Imagem
                  </label>
                  <Input
                    placeholder="https://..."
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option2ImageUrl}
                    onChange={(e) => setQuestionForm({ ...questionForm, option2ImageUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Próxima Chave (ID)
                  </label>
                  <Input
                    placeholder="Ex: c3"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option2NextQuestion}
                    onChange={(e) => setQuestionForm({ ...questionForm, option2NextQuestion: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                    Espécie Resultado (ID)
                  </label>
                  <Input
                    placeholder="Ex: ctenizidae"
                    className="font-['Jaldi',sans-serif] bg-white"
                    value={questionForm.option2ResultSpecies}
                    onChange={(e) => setQuestionForm({ ...questionForm, option2ResultSpecies: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsQuestionDialogOpen(false)}
              className="font-['Jaldi',sans-serif]"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveQuestion} 
              className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]"
            >
              {editingQuestion ? "Atualizar Chave" : "Salvar Chave"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Species Dialog */}
      <Dialog open={isSpeciesDialogOpen} onOpenChange={setIsSpeciesDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
              {editingSpecies ? "Editar Espécie" : "Cadastrar Nova Espécie"}
            </DialogTitle>
            <DialogDescription className="font-['Jaldi',sans-serif]">
              Adicione uma nova família de aranha ao banco de dados
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                  Nome Comum
                </label>
                <Input
                  placeholder="Ex: Ararajuba"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.commonName}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, commonName: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                  Nome Científico
                </label>
                <Input
                  placeholder="Ex: Guaruba guarouba"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.scientificName}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, scientificName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Reino</label>
                <Input
                  placeholder="Ex: Animalia"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.kingdom}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, kingdom: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Filo</label>
                <Input
                  placeholder="Ex: Chordata"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.phylum}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, phylum: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Classe</label>
                <Input
                  placeholder="Ex: Aves"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.class}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, class: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Ordem</label>
                <Input
                  placeholder="Ex: Psittaciformes"
                  className="font-['Jaldi',sans-serif]"
                  value={speciesForm.order}
                  onChange={(e) => setSpeciesForm({ ...speciesForm, order: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Descrição
              </label>
              <Textarea 
                placeholder="Descrição detalhada da espécie..."
                className="font-['Jaldi',sans-serif] h-24"
                value={speciesForm.description}
                onChange={(e) => setSpeciesForm({ ...speciesForm, description: e.target.value })}
              />
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                URL da Imagem
              </label>
              <Input
                placeholder="https://..."
                className="font-['Jaldi',sans-serif]"
                value={speciesForm.imageUrl}
                onChange={(e) => setSpeciesForm({ ...speciesForm, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveSpecies} className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]">
              Salvar Espécie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}