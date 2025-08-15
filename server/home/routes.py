from flask import Blueprint, jsonify
from flask_login import current_user


home_api_bp = Blueprint('home', __name__, url_prefix='/api')


@home_api_bp.route('/user')
def index():
    if current_user.is_authenticated:
        return jsonify({'name': current_user.name}), 200
    return jsonify({'ok': False, 'erro': 'Não há usuário logado'}), 401