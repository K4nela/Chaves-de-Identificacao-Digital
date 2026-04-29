from flask import Flask, render_template, request

app = Flask(__name__)

TOTAL_ETAPAS = 4  # número total de perguntas

# Árvore de decisão
arvore = {
    "inicio": {
        "pergunta": "A aranha vive em toca no solo?",
        "sim": "p2",
        "nao": "p3"
    },

    "p2": {
        "pergunta": "A aranha possui corpo grande e peludo?",
        "sim": "caranguejeira",
        "nao": "aranha_de_toca"
    },

    "p3": {
        "pergunta": "A aranha constrói alçapão (porta de terra)?",
        "sim": "aranha_alcapao",
        "nao": "p4"
    },

    "p4": {
        "pergunta": "Ela é pequena e discreta?",
        "sim": "migalomorfa_pequena",
        "nao": "migalomorfa_desconhecida"
    }
}

# Etapas (para barra de progresso)
etapas_numero = {
    "inicio": 1,
    "p2": 2,
    "p3": 3,
    "p4": 4
}

# "Banco de dados"
resultados = [
    {
        "nome": "Caranguejeira",
        "tipo": "caranguejeira",
        "habitat": "toca",
        "descricao": "Aranha grande e peluda, comum em regiões tropicais.",
        "imagem": "caranguejeira.jpg"
    },
    {
        "nome": "Aranha de Alçapão",
        "tipo": "aranha_alcapao",
        "habitat": "solo",
        "descricao": "Constrói portas camufladas no solo.",
        "imagem": "alcapao.jpg"
    },
    {
        "nome": "Migalomorfa",
        "tipo": "migalomorfa_pequena",
        "habitat": "solo",
        "descricao": "Pequenas aranhas migalomorfas discretas.",
        "imagem": "migalomorfa.jpg"
    }
]

# Home
@app.route('/')
def home():
    return render_template("home.html")


# Início do quiz
@app.route("/quiz")
def quiz():
    etapa = "inicio"
    progresso = int((etapas_numero[etapa] / TOTAL_ETAPAS) * 100)

    return render_template(
        "pergunta.html",
        etapa=etapa,
        pergunta=arvore[etapa]["pergunta"],
        progresso=progresso
    )


# Processar respostas
@app.route("/responder", methods=["POST"])
def responder():
    etapa = request.form["etapa"]
    resposta = request.form["resposta"]

    proximo = arvore[etapa][resposta]

    # Resultado final
    if proximo not in arvore:
        for r in resultados:
            if r["tipo"] == proximo:
                return render_template("resultado.html", resultado=r)

        # fallback
        return render_template("resultado.html", resultado={
            "nome": "Não identificado",
            "descricao": "Não foi possível identificar.",
            "habitat": "-",
            "imagem": "erro.jpg"
        })

    # próxima pergunta
    progresso = int((etapas_numero[proximo] / TOTAL_ETAPAS) * 100)

    return render_template(
        "pergunta.html",
        etapa=proximo,
        pergunta=arvore[proximo]["pergunta"],
        progresso=progresso
    )


# Página de filtro
@app.route("/filtro")
def filtro():
    return render_template("filtro.html")


# Resultado do filtro 
@app.route("/resultado_filtro", methods=["POST"])
def resultado_filtro():
    tipo = request.form["tipo"]
    habitat = request.form["habitat"]

    resultados_filtrados = []

    for aracnideo in resultados:
        if (not tipo or aracnideo["tipo"] == tipo) and \
           (not habitat or aracnideo["habitat"] == habitat):
            resultados_filtrados.append(aracnideo)

    # se encontrou
    if resultados_filtrados:
        return render_template("resultado.html", resultado=resultados_filtrados[0])

    # se não encontrou
    return render_template("resultado.html", resultado={
        "nome": "Não encontrado",
        "descricao": "Nenhum aracnídeo corresponde aos filtros.",
        "habitat": "-",
        "imagem": "erro.jpg"
    })


if __name__ == '__main__':
    app.run(debug=True)