from flask import Blueprint, jsonify
from flask_login import logout_user, login_required, current_user


user_api_bp = Blueprint('user', __name__, url_prefix='/api')


@login_required
@user_api_bp.route('/user', methods=['GET'])
def get_user():
    if current_user.is_authenticated:
        return jsonify({
            'name': current_user.name,
            'email': current_user.email
        }), 200
    return jsonify({'message': 'Não há usuário logado no momento'}), 401


@login_required
@user_api_bp.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return jsonify({'ok': True, 'redirect': '/auth'}), 200