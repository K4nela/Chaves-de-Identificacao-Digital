from flask import Blueprint, request, jsonify
from ..models.Especies import Especies
from ..models.Chaves import Chaves
from ..models.Usuarios import Usuarios
from ..models.Opcoes import Opcoes
from ..database.database import db

usuarios_bp = Blueprint('usuarios', __name__)

@usuarios_bp.route('/login', methods=['POST'])
def login():
    """Login por usuário e senha"""
    dados = request.get_json()

    if not dados or 'nomeUsuario' not in dados or 'senha' not in dados:
        return jsonify({"erro": "Usuário e senha são obrigatórios"}), 400

    nome_usuario = dados['nomeUsuario']
    senha = dados['senha']

    usuario = Usuarios.query.filter_by(nome=nome_usuario).first()

    if not usuario:
        return jsonify({"erro": "Usuário não encontrado"}), 404

    if usuario.senha != senha:
        return jsonify({"erro": "Senha incorreta"}), 401

    return jsonify({
        "mensagem": "Login realizado com sucesso",
        "usuario": {
            "id": usuario.id,
            "nome": usuario.nome
        }
    }), 200

@usuarios_bp.route('/criar/chaves', methods=['POST'])
def criar():
    dados = request.get_json()

    if not dados or 'chave' not in dados:
        return jsonify({"erro": "Todos os dados são obrigatórios"}), 400

    if 'opcao1' not in dados or 'opcao2' not in dados:
        return jsonify({"erro": "Os dados das duas alternativas são obrigatórias!"}), 400

    try:
        novaChave = Chaves(
            texto=dados['chave']['texto'],
            categoria=dados['chave'].get('categoria', '')
        )
        db.session.add(novaChave)
        db.session.flush()

        opcao1 = Opcoes(
            texto=dados['opcao1']['texto'],
            descricao=dados['opcao1'].get('descricao', ''),
            imgURL=dados['opcao1'].get('imgURL', ''),
            id_chave=novaChave.id,
            id_especie=dados['opcao1'].get('id_especie'),
            id_proxima_chave=dados['opcao1'].get('id_proxima_chave')
        )
        db.session.add(opcao1)

        opcao2 = Opcoes(
            texto=dados['opcao2']['texto'],
            descricao=dados['opcao2'].get('descricao', ''),
            imgURL=dados['opcao2'].get('imgURL', ''),
            id_chave=novaChave.id,
            id_especie=dados['opcao2'].get('id_especie'),
            id_proxima_chave=dados['opcao2'].get('id_proxima_chave')
        )
        db.session.add(opcao2)
        db.session.commit()

        return jsonify({
            'mensagem': 'Chave criada com sucesso!',
            'chave': {
                'id': novaChave.id,
                'texto': novaChave.texto,
                'categoria': novaChave.categoria
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": f"Erro ao criar chave: {str(e)}"}), 500

@usuarios_bp.route('/criar/chaves/<int:id>', methods=['PUT'])
def atualizar_chave(id):
    chave = Chaves.query.get_or_404(id)
    dados = request.get_json()

    try:
        if 'texto' in dados:
            chave.texto = dados['texto']
        if 'categoria' in dados:
            chave.categoria = dados['categoria']

        db.session.commit()

        return jsonify({
            "mensagem": "Chave atualizada com sucesso",
            "chave": {
                "id": chave.id,
                "texto": chave.texto,
                "categoria": chave.categoria
            }
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": f"Erro ao atualizar chave: {str(e)}"}), 500

#criar o DELET (deletar as chaves)

@usuarios_bp.route('/criar/especies', methods=['POST'])
def criarEspecies():
    dados = request.get_json()

    if not dados:
        return jsonify({'erro': 'Insira todos os campos!'}), 400

    try:
        especie = Especies(
            nomeComum=dados.get('nomeComum', ''),
            nomeCientifico=dados.get('nomeCientifico', ''),
            reino=dados.get('reino', ''),
            filo=dados.get('filo', ''),
            classe=dados.get('classe', ''),
            ordem=dados.get('ordem', ''),
            familia=dados.get('familia', ''),
            genero=dados.get('genero', ''),
            especie=dados.get('especie', ''),
            descricao=dados.get('descricao', ''),
            habitat=dados.get('habitat', ''),
            caracteristicas=dados.get('caracteristicas', ''),
            imgURL=dados.get('imgURL', '')
        )

        db.session.add(especie)
        db.session.commit()

        return jsonify({
            'mensagem': 'Espécie criada com sucesso!',
            'Especie': especie.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': f'Erro ao criar espécie!{str(e)}'}), 500


@usuarios_bp.route('/criar/especies/<int:id>', methods = ['PUT'])
def editarEspecie(id):
    especie = Especies.query.get_or_404(id)
    dados = request.get_json()

    try:
        especie.nomeComum = dados.get('nomeComum', '') or especie.nomeComum
        especie.nomeCientifico = dados.get('nomeCientifico', '') or especie.nomeCientifico
        especie.reino = dados.get('reino', '') or especie.reino
        especie.filo = dados.get('filo', '') or especie.filo
        especie.classe = dados.get('classe', '') or especie.classe
        especie.ordem = dados.get('ordem', '') or especie.ordem
        especie.familia = dados.get('familia', '') or especie.familia
        especie.genero = dados.get('genero', '') or especie.genero
        especie.especie = dados.get('especie', '') or especie.especie
        especie.descricao = dados.get('descricao', '') or especie.descricao
        especie.habitat = dados.get('habitat', '') or especie.habitat
        especie.caracteristicas = dados.get('caracteristicas', '') or especie.caracteristicas
        especie.imgURL = dados.get('imgURL', '') or especie.imgURL

        db.session.commit()

        return jsonify({
            'mensagem': 'Espécie criada com sucesso!',
            'Especie': especie.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": f"Erro ao atualizar chave: {str(e)}"}), 500


