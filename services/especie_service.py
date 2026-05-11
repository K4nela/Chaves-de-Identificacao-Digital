from database import db
from model.especie_model import Especie

def criarEspecie(nome, tipo, habitat, descricao, imagem):
    especie = Especie(
        nome = nome,
        tipo = tipo,
        habitat = habitat,
        descricao = descricao,
        imagem = imagem
    )

    db.session.add(especie)
    db.session.commit()

    return especie

