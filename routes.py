from flask import Flask, render_template
from database import db
from model import Especie

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dados.db'
db.init_app(app)

while app.app_context():
    db.create_all()
    Caranguejeira = Especie(nome='caranguejeira',
                            tipo='caranguejeira',
                            habitat='toca',
                            descricao='Aranha grande e peluda, comum em regiões tropicais.',
                            imagem='imagem.jpeg')
    db.session.add(Caranguejeira)
    db.session.commit()

#Home
# @app.route('/')
# def home():
#     return render_template("home.html")



# # Início do quiz
# @app.route("/quiz")
# def quiz():
#     etapa = "inicio"
#     progresso = int((etapas_numero[etapa] / TOTAL_ETAPAS) * 100)
#
#     return render_template(
#         "pergunta.html",
#         etapa=etapa,
#         pergunta=arvore[etapa]["pergunta"],
#         progresso=progresso
#     )

# #Home
# @app.route('/')
# def home():
#     return render_template("home.html")
#
#
# # Início do quiz
# @app.route("/quiz")
# def quiz():
#     etapa = "inicio"
#     progresso = int((etapas_numero[etapa] / TOTAL_ETAPAS) * 100)
#
#     return render_template(
#         "pergunta.html",
#         etapa=etapa,
#         pergunta=arvore[etapa]["pergunta"],
#         progresso=progresso
#     )
#
#
# # Processar respostas
# @app.route("/responder", methods=["POST"])
# def responder():
#     etapa = request.form["etapa"]
#     resposta = request.form["resposta"]
#
#     proximo = arvore[etapa][resposta]
#
#     # Resultado final
#     if proximo not in arvore:
#         for r in resultados:
#             if r["tipo"] == proximo:
#                 return render_template("resultado.html", resultado=r)
#
#         # fallback
#         return render_template("resultado.html", resultado={
#             "nome": "Não identificado",
#             "descricao": "Não foi possível identificar.",
#             "habitat": "-",
#             "imagem": "erro.jpg"
#         })
#
#     # próxima pergunta
#     progresso = int((etapas_numero[proximo] / TOTAL_ETAPAS) * 100)
#
#     return render_template(
#         "pergunta.html",
#         etapa=proximo,
#         pergunta=arvore[proximo]["pergunta"],
#         progresso=progresso
#     )
#
#
# # Página de filtro
# @app.route("/filtro")
# def filtro():
#     return render_template("filtro.html")
#
#
# # Resultado do filtro
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