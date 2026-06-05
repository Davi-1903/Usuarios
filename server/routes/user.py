from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from database import get_session
from models.user import User
from utils import decode_access_token


router = APIRouter(prefix='/api/user', tags=['User'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


def get_current_user(session: SessionDep, token: str = Depends(oauth2_scheme)) -> User:
    try:
        user_id = decode_access_token(token)
    except:
        raise HTTPException(status_code=401, detail='Token inválido')

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    return user


@router.get('/', response_model=User)
def get_user(user: User = Depends(get_current_user)):
    return user
