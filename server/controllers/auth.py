from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from database import get_session
from models.user import User
from utils import (
    create_access_token, create_refresh_token,
    decode_refresh_token, create_hash, verify_hash
)


router = APIRouter(prefix='/api/auth', tags=['Auth'])
SessionDep = Annotated[Session, Depends(get_session)]


class Token(BaseModel):
    token: str
    refresh_token: str
    token_type: str


class RefreshToken(BaseModel):
    refresh_token: str


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ========================================== ENDPOINTS ==========================================

@router.post('/register', response_model=Token)
def register(session: SessionDep, user_input: UserRegister):
    user = session.scalar(select(User).where(User.email == user_input.email))
    if user:
        raise HTTPException(status_code=400, detail='Credenciais inválidas')

    try:
        user = User(
            name=user_input.name,
            email=user_input.email,
            password=create_hash(user_input.password)
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
    user = session.scalar(select(User).where(User.email == user_input.email))
    if not user or not verify_hash(user.password, user_input.password):
        raise HTTPException(status_code=404, detail='Credenciais inválidas')

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
