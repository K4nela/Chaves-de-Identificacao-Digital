from flask import render_template, request
from database import db

from model.especie_model import Especie
from model.familia_model import Familia

from model.chave_model import Chave

from services.especie_service import criarEspecie
from services.familia_service import criarFamilia

from services.chave_service import criarChave

from main import app

TOTAL_ETAPAS = 4  # número total de perguntas
# Etapas (para barra de progresso)
etapas_numero = {
    "inicio": 1,
    "p2": 2,
    "p3": 3,
    "p4": 4
}

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

# Populando o banco de dados
@app.route('/registrar', methods=['GET', 'POST'])
def popular():

    # GET
    if request.method == 'GET':

        familias = db.session.query(Familia).all()

        return render_template(
            'registrar.html',
            familias=familias
        )

    # POST
    elif request.method == 'POST':

        nome = request.form['nome']
        tipo = request.form['tipo']
        habitat = request.form['habitat']
        descricao = request.form['descricao']
        imagem = request.form['imagem']

        familia_id = request.form['familia_id']

        criarEspecie(
            nome=nome,
            tipo=tipo,
            habitat=habitat,
            descricao=descricao,
            imagem=imagem,
            familia_id=familia_id
        )

        familias = db.session.query(Familia).all()

        return render_template(
            'registrar.html',
            familias=familias
        )

    return None

# Home
@app.route('/')
def home():
    return render_template("home.html")

# Início do quiz
@app.route("/guided")
def quiz():

    etapa = "inicio"

    chave = db.session.query(Chave).filter_by(
        etapa=etapa
    ).first()

    progresso = 25

    return render_template(
        "pergunta.html",
        etapa=etapa,
        pergunta=chave.pergunta,
        progresso=progresso
    )

# Processar respostas
@app.route("/responder", methods=["POST"])
def responder():
    etapa = request.form["etapa"]
    resposta = request.form["resposta"]

    chave = db.session.query(Chave).filter_by(
        etapa=etapa
    ).first()

    if resposta == "sim":
        proximo = chave.resposta_sim
    else:
        proximo = chave.resposta_nao

    resultados = db.session.query(Especie).all()

    print(proximo)
    print(resultados)

    # Resultado final
    proxima_chave = db.session.query(Chave).filter_by(
        etapa=proximo
    ).first()

    if not proxima_chave:
        for r in resultados:

            if r.tipo.lower() == proximo.lower():
                return render_template("resultado.html", resultado = r)

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
        pergunta=proxima_chave.pergunta,
        progresso=progresso
    )

# Página de filtro
@app.route("/filtro")
def filtro():
    return render_template("filtro.html")

@app.route('/registrar_chave', methods=['GET', 'POST'])
def registrar_chave():

    if request.method == 'GET':

        return render_template(
            'registrar_chave.html'
        )

    elif request.method == 'POST':

        etapa = request.form['etapa']

        pergunta = request.form['pergunta']

        resposta_sim = request.form['resposta_sim']

        resposta_nao = request.form['resposta_nao']

        criarChave(
            etapa,
            pergunta,
            resposta_sim,
            resposta_nao
        )

        return render_template(
            'registrar_chave.html'
        )
    
@app.route('/registrar_familia', methods=['GET', 'POST'])
def registrar_familia():

    if request.method == 'GET':

        return render_template(
            'registrar_familia.html'
        )

    elif request.method == 'POST':

        nome = request.form['nome']

        criarFamilia(nome)

        return render_template(
            'registrar_familia.html'
        )
    
# Resultado do filtro 
# @app.route("/resultado_filtro", methods=["POST"])
# def resultado_filtro():
#     tipo = request.form["tipo"]
#     habitat = request.form["habitat"]
#
#     resultados_filtrados = []
#
#     for aracnideo in resultados:
#         if (not tipo or aracnideo["tipo"] == tipo) and \
#            (not habitat or aracnideo["habitat"] == habitat):
#             resultados_filtrados.append(aracnideo)
#
#     # se encontrou
#     if resultados_filtrados:
#         return render_template("resultado.html", resultado=resultados_filtrados[0])
#
#     # se não encontrou
#     return render_template("resultado.html", resultado={
#         "nome": "Não encontrado",
#         "descricao": "Nenhum aracnídeo corresponde aos filtros.",
#         "habitat": "-",
#         "imagem": "erro.jpg"
#     })


if __name__ == '__main__':
    app.run(debug=True)