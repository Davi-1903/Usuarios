from flask import Blueprint, jsonify
from flask_login import logout_user, current_user


home_api_bp = Blueprint('home', __name__, url_prefix='/')


@home_api_bp.route('/user')
def index():
    if current_user.is_authenticated:
        return jsonify({'ok': True, 'name': current_user.name}), 200
    return jsonify({'ok': False, 'erro': 'Não há usuário logado'}), 401


@home_api_bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'ok': True, 'redirectTo': '/'}), 200