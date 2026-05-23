from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, OAuth2PasswordBearer
from sqlmodel import Session
from database import get_session
from models.user import User
from utils import decode_access_token


router = APIRouter(prefix='/api/user', tags=['User'])
SessionDep = Annotated[Session, Depends(get_session)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
security = HTTPBearer()


def get_current_user(session: SessionDep, token: str = Depends(oauth2_scheme)) -> User:
    try:
        user_id = decode_access_token(token)
    except:
        raise HTTPException(status_code=401, detail='Token inválido')

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    return user


@router.get('/')
def get_user(user: User = Depends(get_current_user)):
    return JSONResponse(
        status_code=200,
        content={
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    )
