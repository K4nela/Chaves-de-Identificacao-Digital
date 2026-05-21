from flask import Blueprint, jsonify
from ..models.Especies import Especies

especies_bp = Blueprint("species", __name__)

@especies_bp.route("/especies", methods=["GET"])
def get_especies():
    especies = Especies.query.all()

    return jsonify([e.to_dict() for e in especies])

@especies_bp.route("/especies/<int:id>", methods=["GET"])
def get_especie(id):
    especie = Especies.query.get_or_404(id)
    return jsonify(especie.to_dict())