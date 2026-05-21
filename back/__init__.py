from flask import Flask


def create_app():
    app = Flask(__name__)

    from app.routes.Especies import species_bp
    app.register_blueprint(species_bp)

    return app