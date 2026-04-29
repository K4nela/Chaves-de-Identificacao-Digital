from flask import Flask, render_template, request

app = Flask(__name__)

# Estrutura de dados para a árvore de decisão
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

# Resultados finais
resultados = {
    "caranguejeira": {
        "nome": "Caranguejeira",
        "descricao": "Aranhas grandes e peludas, comuns em regiões tropicais.",
        "habitat": "Vivem em tocas no solo.",
        "imagem": "caranguejeira.jpg"
    },
    "aranha_alcapao": {
        "nome": "Aranha de Alçapão",
        "descricao": "Constrói portas camufladas no solo.",
        "habitat": "Tocas com tampa.",
        "imagem": "alcapao.jpg"
    },
    "migalomorfa": {
        "nome": "Migalomorfa",
        "descricao": "Grupo de aranhas primitivas.",
        "habitat": "Solo e troncos.",
        "imagem": "migalomorfa.jpg"
    }
}

# Rota para a página inicial
@app.route('/')
def home():
    return render_template("home.html")


# Rota para iniciar o quiz
@app.route("/quiz")
def quiz():
    return render_template(
        "pergunta.html",
        etapa="inicio",
        pergunta=arvore["inicio"]["pergunta"]
    )

# Rota para processar as respostas
@app.route("/responder", methods=["POST"])
def responder():
    etapa = request.form["etapa"]
    resposta = request.form["resposta"]

    proximo = arvore[etapa][resposta]

    # Se for resultado final
    if proximo not in arvore:
        resultado_final = resultados.get(proximo, proximo)
        return render_template("resultado.html", resultado=resultado_final)

    # Se ainda for pergunta
    return render_template(
        "pergunta.html",
        etapa=proximo,
        pergunta=arvore[proximo]["pergunta"]
    )

if __name__ == '__main__':
    app.run(debug = True)

