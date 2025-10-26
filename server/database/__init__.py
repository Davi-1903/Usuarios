from flask_sqlalchemy import SQLAlchemy
import os


db = SQLAlchemy()


def init_database(app):
    DATABASE_URI = os.environ.get('DATABASE_URI')
    if DATABASE_URI is None:
        raise RuntimeError('DATABASE_URI não foi definida')
    
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()