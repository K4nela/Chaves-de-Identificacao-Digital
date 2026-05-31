import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Search, Settings, LogOut, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { getChaves, getChave, getEspecies, deleteChave, deleteEspecie, createChave, createEspecie, updateChave, updateEspecie, updateOpcao} from "../services/api";
import type { Chave, Especie } from "../types/api";
import { toast } from "sonner";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [termoBusca, setTermoBusca] = useState("");
  const [chaves, setChaves] = useState<Chave[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [chaveEmEdicao, setChaveEmEdicao] = useState<Chave | null>(null);
  const [especieEmEdicao, setEspecieEmEdicao] = useState<Especie | null>(null);
  const [dialogChaveAberto, setDialogChaveAberto] = useState(false);
  const [dialogEspecieAberto, setDialogEspecieAberto] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [dadosChaves, dadosEspecies] = await Promise.all([
        getChaves(),
        getEspecies()
      ]);
      setChaves(dadosChaves);
      setEspecies(dadosEspecies);
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      toast.error(
        "Não foi possível carregar os dados",
        {
          description: "Verifique sua conexão e tente novamente.",
          duration: 5000,
        }
      );
    } finally {
      setCarregando(false);
    }
  };

  // Estado do formulário de chaves
  const [formularioChave, setFormularioChave] = useState({
    texto: "",
    categoria: "",
    textoOpcao1: "",
    descricaoOpcao1: "",
    urlImagemOpcao1: "",
    proximaChaveOpcao1: "",
    especieResultadoOpcao1: "",
    textoOpcao2: "",
    descricaoOpcao2: "",
    urlImagemOpcao2: "",
    proximaChaveOpcao2: "",
    especieResultadoOpcao2: ""
  });

  // Estado do formulário de espécies
  const [formularioEspecie, setFormularioEspecie] = useState({
    nomeComum: "",
    nomeCientifico: "",
    reino: "",
    filo: "",
    classe: "",
    ordem: "",
    familia: "",
    genero: "",
    especie: "",
    descricao: "",
    habitat: "",
    caracteristicas: "",
    urlImagem: ""
  });

  const removerChave = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover esta chave? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      await deleteChave(id);
      toast.success(
        "Chave removida com sucesso!",
        {
          description: "A chave de identificação foi excluída do sistema.",
          duration: 3000,
        }
      );
      carregarDados();
    } catch (erro) {
      console.error("Erro ao deletar chave:", erro);
      toast.error(
        "Não foi possível remover a chave",
        {
          description: "Tente novamente mais tarde.",
          duration: 4000,
        }
      );
    }
  };

  const removerEspecie = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover esta espécie? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      await deleteEspecie(id);
      toast.success(
        "Espécie removida com sucesso!",
        {
          description: "A espécie foi excluída do sistema.",
          duration: 3000,
        }
      );
      carregarDados();
    } catch (erro) {
      console.error("Erro ao deletar espécie:", erro);
      toast.error(
        "Não foi possível remover a espécie",
        {
          description: "Tente novamente mais tarde.",
          duration: 4000,
        }
      );
    }
  };

  const abrirDialogChave = async (chave?: Chave) => {
  if (chave) {
    setChaveEmEdicao(chave);

    const chaveCompleta = await getChave(chave.id); // ← busca /guia/:id que já tem as opções
    const opcao1 = chaveCompleta.opcoes?.[0];
    const opcao2 = chaveCompleta.opcoes?.[1];

    setFormularioChave({
      texto: chave.texto,
      categoria: chave.categoria || "",
      textoOpcao1: opcao1?.texto || "",
      descricaoOpcao1: opcao1?.descricao || "",
      urlImagemOpcao1: opcao1?.imgURL || "",
      proximaChaveOpcao1: opcao1?.id_proxima_chave?.toString() || "",
      especieResultadoOpcao1: opcao1?.id_especie?.toString() || "",
      textoOpcao2: opcao2?.texto || "",
      descricaoOpcao2: opcao2?.descricao || "",
      urlImagemOpcao2: opcao2?.imgURL || "",
      proximaChaveOpcao2: opcao2?.id_proxima_chave?.toString() || "",
      especieResultadoOpcao2: opcao2?.id_especie?.toString() || "",
    });
  } else {
    setChaveEmEdicao(null);
    setFormularioChave({
      texto: "", categoria: "",
      textoOpcao1: "", descricaoOpcao1: "", urlImagemOpcao1: "",
      proximaChaveOpcao1: "", especieResultadoOpcao1: "",
      textoOpcao2: "", descricaoOpcao2: "", urlImagemOpcao2: "",
      proximaChaveOpcao2: "", especieResultadoOpcao2: ""
    });
  }
  setDialogChaveAberto(true);
};

  const abrirDialogEspecie = (especie?: Especie) => {
    if (especie) {
      setEspecieEmEdicao(especie);
      setFormularioEspecie({
        nomeComum: especie.nomeComum,
        nomeCientifico: especie.nomeCientifico,
        reino: especie.reino,
        filo: especie.filo,
        classe: especie.classe,
        ordem: especie.ordem,
        familia: especie.familia,
        genero: especie.genero,
        especie: especie.especie,
        descricao: especie.descricao,
        habitat: especie.habitat,
        urlImagem: especie.imgURL,
        caracteristicas: especie.caracteristicas
      });
    } else {
      setEspecieEmEdicao(null);
      setFormularioEspecie({
        nomeComum: "",
        nomeCientifico: "",
        reino: "",
        filo: "",
        classe: "",
        ordem: "",
        familia: "",
        genero: "",
        especie: "",
        descricao: "",
        habitat: "",
        urlImagem: "",
        caracteristicas: ""
      });
    }
    setDialogEspecieAberto(true);
  };

  const salvarChave = async () => {
    try {
      const dadosChave = {
        chave: {
          texto: formularioChave.texto,
          categoria: formularioChave.categoria
        },
        opcao1: {
          texto: formularioChave.textoOpcao1,
          descricao: formularioChave.descricaoOpcao1,
          imgURL: formularioChave.urlImagemOpcao1,
          id_proxima_chave: formularioChave.proximaChaveOpcao1 ? parseInt(formularioChave.proximaChaveOpcao1) : null,
          id_especie: formularioChave.especieResultadoOpcao1 ? parseInt(formularioChave.especieResultadoOpcao1) : null
        },
        opcao2: {
          texto: formularioChave.textoOpcao2,
          descricao: formularioChave.descricaoOpcao2,
          imgURL: formularioChave.urlImagemOpcao2,
          id_proxima_chave: formularioChave.proximaChaveOpcao2 ? parseInt(formularioChave.proximaChaveOpcao2) : null,
          id_especie: formularioChave.especieResultadoOpcao2 ? parseInt(formularioChave.especieResultadoOpcao2) : null
        }
      };

      if (chaveEmEdicao) {
        await updateChave(chaveEmEdicao.id, { texto: formularioChave.texto, categoria: formularioChave.categoria });

        const chaveCompleta = await getChave(chaveEmEdicao.id);
        const opcao1 = chaveCompleta.opcoes?.[0];
        const opcao2 = chaveCompleta.opcoes?.[1];
      
        // Atualiza opção 1
        if (opcao1) {
          await updateOpcao(opcao1.id, {
            texto: formularioChave.textoOpcao1,
            descricao: formularioChave.descricaoOpcao1,
            imgURL: formularioChave.urlImagemOpcao1,
            id_proxima_chave: formularioChave.proximaChaveOpcao1 ? parseInt(formularioChave.proximaChaveOpcao1) : null,
            id_especie: formularioChave.especieResultadoOpcao1 ? parseInt(formularioChave.especieResultadoOpcao1) : null,
          });
        }
      
        // Atualiza opção 2
        if (opcao2) {
          await updateOpcao(opcao2.id, {
            texto: formularioChave.textoOpcao2,
            descricao: formularioChave.descricaoOpcao2,
            imgURL: formularioChave.urlImagemOpcao2,
            id_proxima_chave: formularioChave.proximaChaveOpcao2 ? parseInt(formularioChave.proximaChaveOpcao2) : null,
            id_especie: formularioChave.especieResultadoOpcao2 ? parseInt(formularioChave.especieResultadoOpcao2) : null,
          });
        }
              
        toast.success(
          "Chave de identificação atualizada!",
          {
            description: "As alterações foram salvas com sucesso.",
            duration: 4000,
          }
        );
      } else {
        await createChave(dadosChave as any);
        toast.success(
          "Nova chave de identificação criada!",
          {
            description: "A chave foi adicionada ao sistema de identificação.",
            duration: 4000,
          }
        );
      }
      setDialogChaveAberto(false);
      setChaveEmEdicao(null);
      carregarDados();
    } catch (erro) {
      console.error("Erro ao salvar chave:", erro);
      toast.error(
        "Não foi possível salvar a chave",
        {
          description: "Verifique se todos os campos foram preenchidos corretamente.",
          duration: 5000,
        }
      );
    }
  };

  const salvarEspecie = async () => {
    try {
      const dadosEspecie = {
        nomeComum: formularioEspecie.nomeComum || '',
        nomeCientifico: formularioEspecie.nomeCientifico || '',
        reino: formularioEspecie.reino || '',
        filo: formularioEspecie.filo || '',
        classe: formularioEspecie.classe || '',
        ordem: formularioEspecie.ordem || '',
        familia: formularioEspecie.familia || '',
        genero: formularioEspecie.genero || '',
        especie: formularioEspecie.especie || '',
        descricao: formularioEspecie.descricao || '',
        habitat: formularioEspecie.habitat || '',
        caracteristicas: formularioEspecie.caracteristicas || '',
        imgURL: formularioEspecie.urlImagem || ''
      };

      if (especieEmEdicao) {
        await updateEspecie(especieEmEdicao.id, dadosEspecie);
        toast.success(
          `${dadosEspecie.nomeComum} foi atualizada com sucesso!`,
          {
            description: "As informações da espécie foram atualizadas no sistema.",
            duration: 4000,
          }
        );
      } else {
        await createEspecie(dadosEspecie);
        toast.success(
          `${dadosEspecie.nomeComum} foi adicionada ao sistema!`,
          {
            description: "A nova espécie está disponível para identificação.",
            duration: 4000,
          }
        );
      }
      setDialogEspecieAberto(false);
      setEspecieEmEdicao(null);
      carregarDados();
    } catch (erro: any) {
      console.error("Erro ao salvar espécie:", erro);
      toast.error(
        "Não foi possível salvar a espécie",
        {
          description: "Verifique se todos os campos obrigatórios foram preenchidos e tente novamente.",
          duration: 5000,
        }
      );
    }
  };

  const chavesFiltradas = chaves.filter(q =>
    q.texto.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const especiesFiltradas = especies.filter(s =>
    s.nomeComum.toLowerCase().includes(termoBusca.toLowerCase()) ||
    s.nomeCientifico.toLowerCase().includes(termoBusca.toLowerCase())
  );

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#f8faf5] to-white py-12 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <Loader2 className="w-12 h-12 text-[#798e3f] animate-spin mx-auto mb-4" />
          <h2 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-4">
            Carregando painel...
          </h2>
          <p className="font-['Jaldi',sans-serif] text-gray-600">
            Buscando chaves de identificação e espécies cadastradas.
          </p>
        </Card>
      </div>
    );
  }

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
                onClick={() => abrirDialogChave()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Chave
              </Button>

              <Button
                variant="outline"
                className="font-['Jaldi',sans-serif]"
                onClick={() => abrirDialogEspecie()}
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
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10 font-['Jaldi',sans-serif] h-12 border border-gray-300"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="questions" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="questions" className="font-['Jaldi',sans-serif]">
                Chaves ({chavesFiltradas.length})
              </TabsTrigger>
              <TabsTrigger value="species" className="font-['Jaldi',sans-serif]">
                Famílias ({especiesFiltradas.length})
              </TabsTrigger>
            </TabsList>

            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-4">
              {chavesFiltradas.map((chave, indice) => (
                <motion.div
                  key={chave.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: indice * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow border-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-[#798e3f] text-white font-['Jaldi',sans-serif]">
                            {chave.id}
                          </Badge>
                          {chave.categoria && (
                            <Badge variant="outline" className="font-['Jaldi',sans-serif]">
                              {chave.categoria}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-['Jaldi',sans-serif] text-xl font-bold text-gray-900 mb-3">
                          {chave.texto}
                        </h3>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => abrirDialogChave(chave)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removerChave(chave.id)}
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
                {especiesFiltradas.map((especie, indice) => (
                  <motion.div
                    key={especie.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: indice * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={especie.imgURL}
                          alt={especie.nomeComum}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f] mb-1">
                              {especie.nomeComum}
                            </h3>
                            <p className="font-['Jaldi',sans-serif] text-gray-600 italic">
                              {especie.nomeCientifico}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => abrirDialogEspecie(especie)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removerEspecie(especie.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="font-['Jaldi',sans-serif]">{especie.reino}</Badge>
                          <Badge variant="secondary" className="font-['Jaldi',sans-serif]">{especie.classe}</Badge>
                          <Badge variant="outline" className="font-['Jaldi',sans-serif]">{especie.familia}</Badge>
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
      <Dialog open={dialogChaveAberto} onOpenChange={setDialogChaveAberto}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
              {chaveEmEdicao ? "Editar Chave" : "Criar Nova Chave"}
            </DialogTitle>
            <DialogDescription className="font-['Jaldi',sans-serif]">
              Preencha as informações da chave e suas duas opções de resposta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Texto da Chave
              </label>
              <Input
                placeholder="Ex: O espécime possui quelíceras paraxiais?"
                className="font-['Jaldi',sans-serif] border border-gray-300"
                value={formularioChave.texto}
                onChange={(e) => setFormularioChave({ ...formularioChave, texto: e.target.value })}
              />
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Categoria
              </label>
              <Input
                placeholder="Ex: Morfologia, Características..."
                className="font-['Jaldi',sans-serif] border border-gray-300"
                value={formularioChave.categoria}
                onChange={(e) => setFormularioChave({ ...formularioChave, categoria: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-['Jaldi',sans-serif] text-sm font-semibold">Primeira Opção</h3>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Texto</label>
                  <Input
                    placeholder="Ex: Sim"
                    className="font-['Jaldi',sans-serif] border border-gray-300"
                    value={formularioChave.textoOpcao1}
                    onChange={(e) => setFormularioChave({ ...formularioChave, textoOpcao1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Descrição</label>
                  <Textarea
                    placeholder="Descrição..."
                    className="font-['Jaldi',sans-serif] h-20 border border-gray-300"
                    value={formularioChave.descricaoOpcao1}
                    onChange={(e) => setFormularioChave({ ...formularioChave, descricaoOpcao1: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">URL da Imagem</label>
                  <Input
                    placeholder="https://..."
                    className="font-['Jaldi',sans-serif] border border-gray-300"
                    value={formularioChave.urlImagemOpcao1}
                    onChange={(e) => setFormularioChave({ ...formularioChave, urlImagemOpcao1: e.target.value })}
                  />
                </div>
                  <div>
                    <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Próxima Chave</label>
                    <select
                      className="w-full h-9 rounded-md border border-gray-300 px-3 font-['Jaldi',sans-serif] text-sm bg-white"
                      value={formularioChave.proximaChaveOpcao1}
                      onChange={(e) => setFormularioChave({ ...formularioChave, proximaChaveOpcao1: e.target.value })}
                    >
                      <option value="">Nenhuma</option>
                      {chaves.map((c) => (
                        <option key={c.id} value={c.id.toString()}>
                          {c.id} — {c.texto}
                        </option>
                      ))}
                    </select>
                  </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Espécie Resultado</label>
                  <select
                    className="w-full h-9 rounded-md border border-gray-300 px-3 font-['Jaldi',sans-serif] text-sm bg-white"
                    value={formularioChave.especieResultadoOpcao1}
                    onChange={(e) => setFormularioChave({ ...formularioChave, especieResultadoOpcao1: e.target.value })}
                  >
                    <option value="">Nenhuma</option>
                    {especies.map((e) => (
                      <option key={e.id} value={e.id.toString()}>
                        {e.nomeComum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-['Jaldi',sans-serif] text-sm font-semibold">Segunda Opção</h3>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Texto</label>
                  <Input
                    placeholder="Ex: Não"
                    className="font-['Jaldi',sans-serif] border border-gray-300"
                    value={formularioChave.textoOpcao2}
                    onChange={(e) => setFormularioChave({ ...formularioChave, textoOpcao2: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Descrição</label>
                  <Textarea
                    placeholder="Descrição..."
                    className="font-['Jaldi',sans-serif] h-20 border border-gray-300"
                    value={formularioChave.descricaoOpcao2}
                    onChange={(e) => setFormularioChave({ ...formularioChave, descricaoOpcao2: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">URL da Imagem</label>
                  <Input
                    placeholder="https://..."
                    className="font-['Jaldi',sans-serif] border border-gray-300"
                    value={formularioChave.urlImagemOpcao2}
                    onChange={(e) => setFormularioChave({ ...formularioChave, urlImagemOpcao2: e.target.value })}
                  />
                </div>
                    <div>
                      <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Próxima Chave</label>
                      <select
                        className="w-full h-9 rounded-md border border-gray-300 px-3 font-['Jaldi',sans-serif] text-sm bg-white"
                        value={formularioChave.proximaChaveOpcao2}
                        onChange={(e) => setFormularioChave({ ...formularioChave, proximaChaveOpcao2: e.target.value })}
                      >
                        <option value="">Nenhuma2</option>
                        {chaves.map((c) => (
                          <option key={c.id} value={c.id.toString()}>
                            {c.id} — {c.texto}
                          </option>
                        ))}
                      </select>
                    </div>
                  <div>
                    <label className="font-['Jaldi',sans-serif] text-xs mb-1 block text-gray-600">Espécie Resultado</label>
                    <select
                      className="w-full h-9 rounded-md border border-gray-300 px-3 font-['Jaldi',sans-serif] text-sm bg-white"
                      value={formularioChave.especieResultadoOpcao2}
                      onChange={(e) => setFormularioChave({ ...formularioChave, especieResultadoOpcao2: e.target.value })}
                    >
                      <option value="">Nenhuma2</option>
                      {especies.map((e) => (
                        <option key={e.id} value={e.id.toString()}>
                          {e.nomeComum}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={salvarChave} className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]">
              {chaveEmEdicao ? "Atualizar Chave" : "Salvar Chave"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Species Dialog */}
      <Dialog open={dialogEspecieAberto} onOpenChange={setDialogEspecieAberto}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle className="font-['JejuHallasan',sans-serif] text-2xl text-[#798e3f]">
              {especieEmEdicao ? "Editar Espécie" : "Cadastrar Nova Espécie"}
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
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.nomeComum}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, nomeComum: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                  Nome Científico
                </label>
                <Input
                  placeholder="Ex: Guaruba guarouba"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.nomeCientifico}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, nomeCientifico: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Reino</label>
                <Input
                  placeholder="Ex: Animalia"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.reino}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, reino: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Filo</label>
                <Input
                  placeholder="Ex: Chordata"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.filo}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, filo: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Classe</label>
                <Input
                  placeholder="Ex: Aves"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.classe}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, classe: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Ordem</label>
                <Input
                  placeholder="Ex: Psittaciformes"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.ordem}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, ordem: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Família</label>
                <Input
                  placeholder="Ex: Psittacidae"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.familia}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, familia: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Gênero</label>
                <Input
                  placeholder="Ex: Guaruba"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.genero}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, genero: e.target.value })}
                />
              </div>
              <div>
                <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">Espécie</label>
                <Input
                  placeholder="Ex: guarouba"
                  className="font-['Jaldi',sans-serif] border border-gray-300"
                  value={formularioEspecie.especie}
                  onChange={(e) => setFormularioEspecie({ ...formularioEspecie, especie: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Descrição
              </label>
              <Textarea
                placeholder="Descrição detalhada da espécie..."
                className="font-['Jaldi',sans-serif] h-24 border border-gray-300"
                value={formularioEspecie.descricao}
                onChange={(e) => setFormularioEspecie({ ...formularioEspecie, descricao: e.target.value })}
              />
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Habitat
              </label>
              <Textarea
                placeholder="Ex: Florestas tropicais da Amazônia..."
                className="font-['Jaldi',sans-serif] h-20 border border-gray-300"
                value={formularioEspecie.habitat}
                onChange={(e) => setFormularioEspecie({ ...formularioEspecie, habitat: e.target.value })}
              />
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                Características
              </label>
              <Textarea
                placeholder="Ex: Plumagem amarela vibrante, bico robusto..."
                className="font-['Jaldi',sans-serif] h-20 border border-gray-300"
                value={formularioEspecie.caracteristicas}
                onChange={(e) => setFormularioEspecie({ ...formularioEspecie, caracteristicas: e.target.value })}
              />
            </div>
            <div>
              <label className="font-['Jaldi',sans-serif] text-sm font-semibold mb-2 block">
                URL da Imagem
              </label>
              <Input
                placeholder="https://..."
                className="font-['Jaldi',sans-serif] border border-gray-300"
                value={formularioEspecie.urlImagem}
                onChange={(e) => setFormularioEspecie({ ...formularioEspecie, urlImagem: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={salvarEspecie} className="bg-[#798e3f] hover:bg-[#748f27] font-['Jaldi',sans-serif]">
              Salvar Espécie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}