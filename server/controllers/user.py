from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session
from database import get_session
from models.user import User
from utils import decode_access_token


router = APIRouter(prefix='/api/user', tags=['User'])
SessionDep = Annotated[Session, Depends(get_session)]
security = HTTPBearer()


@router.get('/')
def get_user(session: SessionDep, credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        user_id = decode_access_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail='Usuário não encontrado'
        )

    return JSONResponse(
        status_code=200,
        content={'name': user.name}
    )
