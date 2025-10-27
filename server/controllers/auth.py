from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required
from argon2.exceptions import VerifyMismatchError
from argon2 import PasswordHasher
from models.user import User
from database import db


bp = Blueprint('api', __name__, url_prefix='/api/auth')
ph = PasswordHasher()


@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json(silent=True)
        if data is None:
            return jsonify({'ok': False, 'message': 'Os dados não foram recebidos'}), 401

        user = User.query.filter_by(email=data['email']).first()
        if user:
            return jsonify({'ok': False, 'message': 'Este email já está cadastrado'}), 401
        
        new_user = User(name=data['name'], email=data['email'], password=ph.hash(data['password'])) # type: ignore
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return jsonify({'ok': True, 'redirect': '/dash'}), 200
    
    except:
        return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json(silent=True)
        if data is None:
            return jsonify({'ok': False, 'message': 'Os dados não foram recebidos'}), 401
        
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({'ok': False, 'message': 'Este email não está cadastrado no sistema'}), 401
        
        # Caso o hash não corresponda à senha, um erro será lançado (VerifyMismatchError)
        ph.verify(user.password, data['password'])

        login_user(user)
        return jsonify({'ok': True, 'redirect': '/dash'}), 200
    
    except VerifyMismatchError:
        return jsonify({'ok': False, 'message': 'A senha está incorreta'}), 401
    
    except:
        return jsonify({'ok': False, 'message': 'Ocorreu um erro interno'}), 500


@bp.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({'ok': True, 'redirect': '/auth'}), 200


@bp.route('/check', methods=['GET'])
@login_required
def check_auth():
    return jsonify({'ok': True}), 200
