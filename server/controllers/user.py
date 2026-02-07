from flask import Blueprint, jsonify
from flask_login import login_required, current_user


bp = Blueprint('user', __name__, url_prefix='/api')


@bp.get('/user')
@login_required
def get_user():
    return jsonify({
        'id': current_user.id,
        'name': current_user.name,
        'email': current_user.email
    }), 200
