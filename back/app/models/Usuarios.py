from ..database.database import db

class Usuarios(db.Model):
    __tablename__ = 'Usuarios'

    id = db.Column(db.String(20), primary_key = True)
    nome = db.Column(db.String(20), unique = True,  nullable = False)
    senha = db.Column(db.String(20), nullable = False)


    def __repr__(self):
        return f"<{self.id}, {self.nome}>"

    def to_dict(self):
        return{
            "id": self.id,
            "nome": self.nome
        }

