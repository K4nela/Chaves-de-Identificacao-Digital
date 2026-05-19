from flask import Blueprint, jsonify
from ..models.Chaves import Chaves
from ..models.Opcoes import Opcoes
keys_bp = Blueprint("keys", __name__)

@keys_bp.route("/api/chaves", methods=["GET"])
def get_chaves():
    chaves = Chaves.query.all()

    return jsonify([c.to_dict() for c in chaves])

@keys_bp.route("/api/guided/start", methods=["GET"])
def start():
    first = Chaves.query.order_by(Chaves.id.asc()).first()

    if not first:
        return jsonify({"error": "Nenhuma chave encontrada"}), 404

    options = Opcoes.query.filter_by(id_chave=first.id).all()

    return jsonify({
        "id": first.id,
        "texto": first.texto,
        "categoria": first.categoria,
        "options": [
            {
                "id": o.id,
                "texto": o.texto,
                "proxima_chave_id": o.id_proxima_chave,
                "especie_id": o.id_especie
            }
            for o in options
        ]
    })


@keys_bp.route("/api/guided/<int:id>", methods=["GET"])
def get_question(id):
    question = Chaves.query.get_or_404(id)

    options = Opcoes.query.filter_by(id_chave=id).all()

    return jsonify({
        "id": question.id,
        "text": question.texto,
        "category": question.categoria,
        "options": [o.to_dict() for o in options]
    })