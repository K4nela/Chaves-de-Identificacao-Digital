from database import db

class Familia(db.Model):

    __tablename__ = 'Familias'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(100),
        nullable=False
    )

    # 🔥 RELACIONAMENTO
    especies = db.relationship(
        'Especie',
        backref='familia',
        lazy=True
    )

    def __repr__(self):
        return f"<{self.nome}>"