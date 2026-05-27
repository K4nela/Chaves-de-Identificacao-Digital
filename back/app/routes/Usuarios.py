from flask import Blueprint, request, jsonify

from ..models.Chaves import Chaves
from ..models.Usuarios import Usuarios
from ..models.Opcoes import Opcoes
from ..database.database import db

usuarios_bp = Blueprint('usuarios', __name__)


@usuarios_bp.route('/login', methods=['POST'])
def login():
    # Obtém o ID enviado no corpo da requisição (JSON)
    dados = request.get_json()

    # Verificação básica se o ID foi enviado
    if not dados or 'id' not in dados:
        return jsonify({"erro": "ID é obrigatório"}), 400

    id_usuario = dados['id']

    # Busca o usuário ou retorna 404 se não existir
    usuario = Usuarios.query.get_or_404(id_usuario)

    # Retorna os dados do usuário (Login "simples" aprovado)
    return jsonify({
        "mensagem": "Login realizado",
        "usuario": usuario.to_dict()
    }), 200


@usuarios_bp.route('/criar/chaves', methods=['POST'])
def criar():
    dados = request.get_json()

    if not dados or 'chave' not in dados:
        return jsonify({"erro": "Todos os dados são obrigatórios"}), 400

    if 'opcao1' not in dados or 'opcao2' not in dados:
        return jsonify({"erro": "Os dados das duas alternativas são obrigatórias!"}), 400

    try:
        # 1. Criar a chave
        novaChave = Chaves(
            texto=dados['chave']['texto'],  # CORREÇÃO: usar ['texto'] não ('texto')
            categoria=dados['chave'].get('categoria', '')  # CORREÇÃO: .get() com parênteses, não colchetes
        )
        db.session.add(novaChave)  # CORREÇÃO: adicionar a chave ANTES das opções
        db.session.flush()  # CORREÇÃO: gerar o ID antes de usá-lo nas opções

        # 2. Criar opção 1
        opcao1 = Opcoes(
            texto=dados['opcao1']['texto'],  # CORREÇÃO: usar ['texto'] não ('texto')
            descricao=dados['opcao1'].get('descricao', ''),
            imgURL=dados['opcao1'].get('imgURL', ''),
            id_chave=novaChave.id,
            id_especie=dados['opcao1'].get('id_especie'),
            id_proxima_chave=dados['opcao1'].get('id_proxima_chave')
        )
        db.session.add(opcao1)

        # 3. Criar opção 2
        opcao2 = Opcoes(
            texto=dados['opcao2']['texto'],  # CORREÇÃO: usar ['texto'] não ('texto')
            descricao=dados['opcao2'].get('descricao', ''),
            imgURL=dados['opcao2'].get('imgURL', ''),
            id_chave=novaChave.id,
            id_especie=dados['opcao2'].get('id_especie'),
            id_proxima_chave=dados['opcao2'].get('id_proxima_chave')
        )
        db.session.add(opcao2)

        # 4. Commit de tudo
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


@usuarios_bp.route('/criar/especies', methods = ['POST'])
def criar():
    dados = request.get_json()

    if not dados or not 'nomeComum' in dados:
        return jsonify({"erro": "Insira todos os dados!"})

    try:




    except Exception as e:
