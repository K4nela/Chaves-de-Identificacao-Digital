from ..database.database import db
from ..models.Especies import Especies

def criarEspecie(nome, tipo, habitat, descricao, imagem):

    if any(not campo.strip() for campo in [nome, tipo, habitat, descricao, imagem]):
        return 'Preencha todos os campos!'

    especie = Especies(
        nome = nome,
        tipo = tipo,
        habitat = habitat,
        descricao = descricao,
        imagem = imagem
    )

    db.session.add(especie)
    db.session.commit()

    return especie

