from fastapi import HTTPException
from datetime import datetime, timedelta, timezone
from jwt import ExpiredSignatureError, InvalidTokenError, decode, encode
from utils.database import get_env


def _get_int_env(key: str, default: int) -> int:
    raw_value = get_env(key, str(default))
    try:
        value = int(raw_value)
    except (TypeError, ValueError):
        return default
    return value if value > 0 else default


def create_access_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=_get_int_env('TOKEN_EXPIRE_MINUTES', 60))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'access'})
    token = encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM', 'HS256'))
    return token


def decode_access_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM', 'HS256')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Token inválido')

    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail='Token inválido')

    user_id = payload.get('sub')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Token inválido: campo "sub" não encontrado')
    return int(user_id)


def create_refresh_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=_get_int_env('REFRESH_TOKEN_EXPIRE_DAYS', 7))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'refresh'})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM', 'HS256'))


def decode_refresh_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM', 'HS256')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Refresh token expirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Refresh token inválido')

    if payload.get('type') != 'refresh':
        raise HTTPException(status_code=401, detail='Token inválido')

    user_id = payload.get('sub')
    if user_id is None:
        raise HTTPException(status_code=401, detail='Refresh token inválido')
    return int(user_id)
