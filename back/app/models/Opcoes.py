from ..database.database import db

class Opcoes(db.Model):
    __tablename__ = 'Opcoes'

    id = db.Column(db.Integer, primary_key= True)
    texto = db.Column(db.String(50), nullable = False)
    descricao = db.Column(db.String(100), nullable = False)
    imgURL = db.Column(db.String(100), nullable = False)

    id_chave = db.Column(db.Integer, db.ForeignKey('Chaves.id'), nullable = False)
    id_especie = db.Column(db.Integer, db.ForeignKey('Especies.id'), nullable = True)
    id_proxima_chave = db.Column(db.Integer, db.ForeignKey('Chaves.id'), nullable = True)

    chave = db.relationship("Chaves", foreign_keys=[id_chave])
    especie = db.relationship("Especies", foreign_keys=[id_especie])
    proxima_chave = db.relationship("Chaves", foreign_keys=[id_proxima_chave])

    def __repr__(self):
        return f"<{self.id}, {self.texto}>"

    def to_dict(self):
        return{
            "id": self.id,
            "texto": self.texto,
            "descricao": self.descricao,
            "imgURL": self.imgURL,
            "id_chave": self.id_chave,
            "id_especie": self.id_especie,
            "id_proxima_chave": self.id_proxima_chave
        }