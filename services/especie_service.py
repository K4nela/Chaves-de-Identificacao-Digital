from database import db
from model.especie_model import Especie

def criarEspecie(
    nome,
    tipo,
    habitat,
    descricao,
    imagem,
    familia_id
):

    if any(
        not campo.strip()
        for campo in [
            nome,
            tipo,
            habitat,
            descricao,
            imagem
        ]
    ):
        return 'Preencha todos os campos!'

    especie = Especie(
        nome=nome,
        tipo=tipo,
        habitat=habitat,
        descricao=descricao,
        imagem=imagem,
        familia_id=familia_id
    )

    db.session.add(especie)
    db.session.commit()

    return especie