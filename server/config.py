from flask import jsonify
from flask_login import LoginManager
from database import init_database
from database.model import User


def config_app(app):
    app.secret_key = 'yftycgbnihougftyrxfghbougyftrxtdgyftycgbnihougftyrxfghbougyftrxtdg'

    login_manager = LoginManager()
    login_manager.login_view = '/auth'
    login_manager.init_app(app)

    init_database(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.get(user_id)

    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({'error': 'Permissão negada'}), 401