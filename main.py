from flask import Flask
from model import Dado
from database import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dados.db'
db.init_app(app)

@app.route('/')
def index():
    return 'Bem-vindo ao sistema de chaves de identificação digital!'

@app.route('/adicionar/<valor>')
def adicionar(valor):
    novo_dado = Dado(valor=valor)
    db.session.add(novo_dado)
    db.session.commit()
    return f'Dado adicionado: {valor}'

@app.route('/dados')
def listar_dados():
    dados = Dado.query.all()
    return '<br>'.join([str(dado) for dado in dados])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)