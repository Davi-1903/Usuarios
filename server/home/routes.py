from flask import Blueprint, jsonify
from flask_login import logout_user, login_required, current_user


home_api_bp = Blueprint('home', __name__, url_prefix='/api')


@home_api_bp.route('/session')
@login_required
def session():
    return jsonify({
        'is_authenticated': current_user.is_authenticated,
        'name': current_user.name,
        'email': current_user.email
    }), 200


@home_api_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({'ok': True, 'redirect': '/auth'}), 200