from flask import Blueprint, jsonify, request
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
from database.model import db, User


auth_api_bp = Blueprint('api', __name__, url_prefix='/api')


@auth_api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True)
    user = User.query.filter_by(email=data.get('email')).first()

    if not user:
        new_user = User(name=data['name'], email=data['email'], password=generate_password_hash(data['password']))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return jsonify({'ok': True, 'redirect': '/dash'}), 200
    return jsonify({'ok': False, 'message': 'Este email já está cadastrado'}), 401


@auth_api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    user = User.query.filter_by(email=data.get('email')).first()

    if user:
        if check_password_hash(user.password, data.get('password')):
            login_user(user)
            return jsonify({'ok': True, 'redirect': '/dash'}), 200
        return jsonify({'ok': False, 'message': 'A senha está incorreta'}), 401
    return jsonify({'ok': False, 'message': 'Este email não está cadastrado no sistema'}), 401