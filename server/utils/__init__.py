from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import HTTPException
from jwt import ExpiredSignatureError, InvalidTokenError, encode, decode
from os import getenv


def get_env(key: str, default: str | None = None) -> str:
    load_dotenv()
    
    value = getenv(key)
    if value is not None and value != '':
        return value
    if default is not None:
        return default
    raise RuntimeError(f'A variável de ambiente "{key}" não foi definida ou está vazia.')


def create_access_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=int(get_env('TOKEN_EXPIRE_MINUTES')))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'access'})
    token = encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))
    return token


def decode_access_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expirado')
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail='Token inválido')

    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail='Token inválido')

    user_id = payload.get('sub')
    if user_id is None:
        raise ValueError('Token inválido: campo "sub" não encontrado')
    return int(user_id)


def create_refresh_token(data: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=int(get_env('REFRESH_TOKEN_EXPIRE_DAYS', '7')))
    payload = data.copy()
    if payload.get('sub') is not None:
        payload['sub'] = str(payload['sub'])
    payload.update({'exp': expire, 'type': 'refresh'})
    return encode(payload, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))


def decode_refresh_token(token: str) -> int:
    try:
        payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
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
