from database import db

class Especie(db.Model):

    __tablename__ = 'Especies'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(50),
        nullable=False
    )

    tipo = db.Column(
        db.String(50),
        nullable=False
    )

    habitat = db.Column(
        db.String(50),
        nullable=False
    )

    descricao = db.Column(
        db.String(200),
        nullable=False
    )

    imagem = db.Column(
        db.String(100),
        nullable=False
    )

    familia_id = db.Column(
        db.Integer,
        db.ForeignKey('Familias.id')
    )

    def __repr__(self):
        return f"<{self.nome}, {self.tipo}>"