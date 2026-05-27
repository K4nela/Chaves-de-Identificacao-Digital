from database import db
from model.chave_model import Chave

def criarChave(
    etapa,
    pergunta,
    resposta_sim,
    resposta_nao
):

    chave = Chave(
        etapa=etapa,
        pergunta=pergunta,
        resposta_sim=resposta_sim,
        resposta_nao=resposta_nao
    )

    db.session.add(chave)
    db.session.commit()

    return chave