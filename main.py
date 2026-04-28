from flask import Flask, render_template, request

app = Flask(__name__)

# Estrutura de dados para a árvore de decisão
arvore = {
    "inicio": {
        "pergunta": "...",
        "sim": "...",
        "nao": "..."
    },

    "p2": {
        "pergunta": "...",
        "sim": "...",
        "nao": "..."
    },

    "p3": {
        "pergunta": "...",
        "sim": "...",
        "nao": "..."
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
        return render_template("resultado.html", resultado=proximo)

    # Se ainda for pergunta
    return render_template(
        "pergunta.html",
        etapa=proximo,
        pergunta=arvore[proximo]["pergunta"]
    )

if __name__ == '__main__':
    app.run(debug = True)

