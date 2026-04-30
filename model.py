from database import db

class Dado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Dado {self.valor}>'
