from typing import Annotated
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import APIRouter, Depends, HTTPException
from pydantic import EmailStr
from sqlmodel import SQLModel, Session, select
from database import get_session
from models.user import User
from utils import create_access_token


router = APIRouter(prefix='/auth', tags=['Auth'])
SessionDep = Annotated[Session, Depends(get_session)]
ph = PasswordHasher()


class Token(SQLModel):
    token: str
    token_type: str


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
    try:
        user = session.exec(select(User).where(User.email == user_input.email)).first()
        if user:
            raise HTTPException(status_code=400, detail='Email já cadastrado')
        
        user = User(
            name=user_input.name,
            email=user_input.email,
            password=ph.hash(user_input.password)
        )
        session.add(user)
        session.commit()
        session.refresh(user)

        return {
            'token': create_access_token({'sub': user.id}),
            'token_type': 'bearer'
        }
    
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail='Erro interno')


@router.post('/login', response_model=Token)
def login(session: SessionDep, user_input: UserLogin):
    try:
        user = session.exec(select(User).where(User.email == user_input.email)).first()
        if not user:
            raise HTTPException(status_code=404, detail='Usuário não encontrado')

        # Caso as senhas não correspondam um erro será lançado
        ph.verify(user.password, user_input.password)
        
        return {
            'token': create_access_token({'sub': user.id}),
            'token_type': 'bearer'
        }

    except VerifyMismatchError:
        raise HTTPException(status_code=401, detail='Senha inválida')

    except Exception as e:
        raise HTTPException(status_code=500, detail='Erro interno')
