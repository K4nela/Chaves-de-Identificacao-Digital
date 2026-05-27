from flask import Blueprint, jsonify
from ..models.Chaves import Chaves
from ..models.Opcoes import Opcoes
chaves_bp = Blueprint("Chaves", __name__)

@chaves_bp.route("/chaves", methods=["GET"])
def get_chaves():
    chaves = Chaves.query.all()

    return jsonify([c.to_dict() for c in chaves])

@chaves_bp.route("/guia/comecar", methods=["GET"])
def start():
    primeiro = Chaves.query.order_by(Chaves.id.asc()).first()

    if not primeiro:
        return jsonify({"error": "Nenhuma chave encontrada"}), 404

    opcoes = Opcoes.query.filter_by(id_chave=primeiro.id).all()

    return jsonify({
        "id": primeiro.id,
        "texto": primeiro.texto,
        "categoria": primeiro.categoria,
        "opcoes": [
            {
                "id": o.id,
                "texto": o.texto,
                "id_proxima_chave": o.id_proxima_chave,
                "id_especie": o.id_especie
            }
            for o in opcoes
        ]
    })


@chaves_bp.route("/guia/<int:id>", methods=["GET"])
def chave(id):
    chave = Chaves.query.get_or_404(id)

    opcoes = Opcoes.query.filter_by(id_chave=id).all()

    return jsonify({
        "id": chave.id,
        "texto": chave.texto,
        "categoria": chave.categoria,
        "opcoes": [o.to_dict() for o in opcoes]
    })