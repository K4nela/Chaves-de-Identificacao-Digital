from database import db
from model.familia_model import Familia

def criarFamilia(nome):

    familia = Familia(
        nome=nome
    )

    db.session.add(familia)
    db.session.commit()

    return familia