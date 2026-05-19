from flask import Flask


def create_app():
    app = Flask(__name__)

    from app.routes.especies import species_bp
    app.register_blueprint(species_bp)

    return app