from typing import Annotated
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import EmailStr
from sqlmodel import SQLModel, Session, select
from database import get_session
from models.user import User
from utils import create_access_token, create_refresh_token, decode_refresh_token


router = APIRouter(prefix='/api/auth', tags=['Auth'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHasher()


class Token(SQLModel):
    token: str
    refresh_token: str
    token_type: str


class RefreshToken(SQLModel):
    refresh_token: str


class UserRegister(SQLModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(SQLModel):
    email: EmailStr
    password: str


# ========================================== ENDPOINTS ==========================================

@router.post('/register', response_model=Token)
def register(session: SessionDep, user_input: UserRegister):
    user = session.exec(select(User).where(User.email == user_input.email)).first()
    if user:
        raise HTTPException(status_code=400, detail='Email já cadastrado')

    try:
        user = User(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password)
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    except:
        session.rollback()
        raise HTTPException(status_code=500, detail='Erro interno')

    return JSONResponse(
        status_code=201,
        content={
            'token': create_access_token({'sub': user.id}),
            'refresh_token': create_refresh_token({'sub': user.id}),
            'token_type': 'bearer'
        }
    )


@router.post('/login', response_model=Token)
def login(session: SessionDep, user_input: UserLogin):
    user = session.exec(select(User).where(User.email == user_input.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')

    try:
        ph.verify(user.password, user_input.password)
    except VerifyMismatchError:
        raise HTTPException(status_code=401, detail='Senha inválida')

    return JSONResponse(
        status_code=200,
        content={
            'token': create_access_token({'sub': user.id}),
            'refresh_token': create_refresh_token({'sub': user.id}),
            'token_type': 'bearer'
        }
    )


@router.post('/refresh')
def refresh(body: RefreshToken):
    user_id = decode_refresh_token(body.refresh_token)
    return JSONResponse(
        status_code=200,
        content={
            'token': create_access_token({'sub': int(user_id)}),
            'token_type': 'bearer'
        }
    )
