from database import db

class Especie(db.Model):
    __tablename__ = 'especies'
    id = db.Column(db.Integer, nullable = True, primary_key = True)
    nome = db.Column(db.String(50), nullable = True)
    tipo = db.Column(db.String(50), nullable = True)
    habitat = db.Column(db.String(50), nullable = True)
    descricao = db.Column(db.String(200), nullable = True)
    imagem = db.Column(db.String(100), nullable = True)

    def __repr__(self):
        return f"<{self.nome}, {self.tipo}, {self.habitat}, {self.descricao}>"