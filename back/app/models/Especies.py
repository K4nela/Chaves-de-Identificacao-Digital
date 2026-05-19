from ..database.database import db

class Especies(db.Model):
    __tablename__ = 'Especies'

    id = db.Column(db.Integer, primary_key = True)
    nomeComum = db.Column(db.String(50), nullable = False)
    nomeCientifico = db.Column(db.String(50), nullable = False)
    reino = db.Column(db.String(50), nullable = False)
    filo = db.Column(db.String(50), nullable = False)
    classe = db.Column(db.String(50), nullable = False)
    ordem = db.Column(db.String(50), nullable = False)
    familia = db.Column(db.String(50), nullable = False)
    genero = db.Column(db.String(50), nullable = False)
    especie = db.Column(db.String(50), nullable = False)
    descricao = db.Column(db.String(200), nullable = False)
    habitat = db.Column(db.String(50), nullable = False)
    caracteristicas = db.Column(db.String(200), nullable = False)
    imgURL = db.Column(db.String(50), nullable = False)


    def __repr__(self):
        return f"<{self.nomeComum}, {self.especie}>"

    def to_dict(self):
        return {
            "id": self.id,
            "nomeComum": self.nomeComum,
            "nomeCientifico" : self.nomeCientifico,
            "reino": self.reino,
            "filo": self.filo,
            "classe": self.classe,
            "ordem": self.ordem,
            "familia": self.familia,
            "genero": self.genero,
            "especie": self.especie,
            "descricao": self.descricao,
            "habitat": self.habitat,
            "caracteristicas": self.caracteristicas,
            "imgURL": self.imgURL
        }