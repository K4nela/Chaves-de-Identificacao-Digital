from database import db

class Chave(db.Model):

    __tablename__ = 'Chaves'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    etapa = db.Column(
        db.String(50),
        nullable=False
    )

    pergunta = db.Column(
        db.String(300),
        nullable=False
    )

    resposta_sim = db.Column(
        db.String(100),
        nullable=False
    )

    resposta_nao = db.Column(
        db.String(100),
        nullable=False
    )

    def __repr__(self):
        return f"<{self.etapa}>"