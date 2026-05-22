from ..database.database import db

class Chaves(db.Model):
    __tablename__ = 'Chaves'

    id = db.Column(db.Integer, primary_key = True)

    texto = db.Column(db.String(100), nullable = False)
    categoria = db.Column(db.String(100), nullable = False)

    def __repr__(self):
        return f"<{self.id}, {self.texto}>"

    def to_dict(self):
        return {
            "id": self.id,
            "texto": self.texto,
            "categoria": self.categoria
        }