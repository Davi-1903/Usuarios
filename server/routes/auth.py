from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pwdlib import PasswordHash
from pydantic import BaseModel, EmailStr
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select
from database import get_session
from models.user import User
from utils import create_access_token, create_refresh_token, decode_refresh_token


router = APIRouter(prefix='/api/auth', tags=['Auth'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHash.recommended()


class Token(BaseModel):
    token: str
    token_type: str


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


def set_refresh_cookie(response: Response, token: str):
    response.set_cookie(
        key='refresh_token',
        value=token,
        httponly=True,
        secure=True,
        samesite='strict',
        max_age=60 * 60 * 24 * 30,
        path='/api/auth',
    )


# ========================================== ENDPOINTS ==========================================


@router.post('/register', response_model=Token, status_code=201)
def register(session: SessionDep, user_input: UserRegister, response: Response):
    try:
        user = User(name=user_input.name, email=user_input.email, password=ph.hash(user_input.password))
        session.add(user)
        session.commit()
        session.refresh(user)

    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail='Violação na integridade dos dados')

    refresh_token = create_refresh_token({'sub': user.id})
    set_refresh_cookie(response, refresh_token)

    return {
        'token': create_access_token({'sub': user.id}),
        'token_type': 'bearer',
    }


@router.post('/login', response_model=Token)
def login(session: SessionDep, user_input: UserLogin, response: Response):
    user = session.scalar(select(User).where(User.email == user_input.email))
    if not user or not ph.verify(user_input.password, user.password):
        raise HTTPException(status_code=404, detail='Credenciais inválidas')

    refresh_token = create_refresh_token({'sub': user.id})
    set_refresh_cookie(response, refresh_token)

    return {
        'token': create_access_token({'sub': user.id}),
        'token_type': 'bearer',
    }


@router.post('/refresh')
def refresh(request: Request, response: Response):
    token = request.cookies.get('refresh_token')
    if not token:
        raise HTTPException(status_code=401, detail='Refresh token ausente')

    user_id = decode_refresh_token(token)
    new_refresh = create_refresh_token({'sub': int(user_id)})
    set_refresh_cookie(response, new_refresh)

    return {'token': create_access_token({'sub': int(user_id)}), 'token_type': 'bearer'}


@router.post('/logout')
def logout(response: Response):
    response.delete_cookie('refresh_token', path='/api/auth')
    return {'detail': 'Logout realizado'}
