from datetime import datetime, timedelta
from dotenv import load_dotenv
from jwt import encode, decode
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
    expire = datetime.now() + timedelta(minutes=int(get_env('TOKEN_EXPIRE_MINUTES')))
    data.update({'exp': expire})
    token = encode(data, get_env('SECRET_KEY'), algorithm=get_env('ALGORITHM'))
    return token


def decode_access_token(token: str) -> int:
    payload = decode(token, get_env('SECRET_KEY'), algorithms=[get_env('ALGORITHM')])
    user_id = payload.get('sub')
    if user_id is None:
        raise ValueError('Token inválido: campo "sub" não encontrado')
    return int(user_id)
