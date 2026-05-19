from flask import Blueprint, jsonify
from ..models.Especies import Especies

species_bp = Blueprint("species", __name__)

@species_bp.route("/api/especies", methods=["GET"])
def get_especies():
    especies = Especies.query.all()

    return jsonify([e.to_dict() for e in especies])

@species_bp.route("/api/especies/<int:id>", methods=["GET"])
def get_especie(id):
    especie = Especies.query.get_or_404(id)
    return jsonify(especie.to_dict())