from flask_login import LoginManager
from database import init_database
from database.model import User


def config_app(app, file):
    app.secret_key = 'yftycgbnihougftyrxfghbougyftrxtdgyftycgbnihougftyrxfghbougyftrxtdg'

    login_manager = LoginManager()
    login_manager.login_view = '/auth'
    login_manager.init_app(app)

    init_database(app, file)

    @login_manager.user_loader
    def load_user(user_id):
        return User.get(user_id)