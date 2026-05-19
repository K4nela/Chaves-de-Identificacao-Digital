from flask import Flask
from flask_cors import CORS
from app.database.database import db
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


from app.routes.especies import species_bp
from app.routes.chaves import keys_bp
app.register_blueprint(species_bp)
app.register_blueprint(keys_bp)

if __name__ == '__main__':
    app.run(debug=True)