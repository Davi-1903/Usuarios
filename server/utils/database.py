from os import getenv
from time import sleep
from sqlalchemy import Engine
from sqlalchemy.exc import OperationalError
from sqlmodel import create_engine


def get_env(key: str, default: str | None = None) -> str:
    value = getenv(key)
    if value is not None and value != '':
        return value
    if default is not None:
        return default
    raise RuntimeError(f'A variável de ambiente "{key}" não foi definida ou está vazia.')


def get_engine(**kargs) -> Engine:
    for _ in range(10):
        try:
            engine = create_engine(**kargs)
            engine.connect()
            return engine
        except OperationalError:
            sleep(3)
    raise RuntimeError('Não foi possível estabelecer uma conexão com o banco de dados')


def create_url() -> str:
    host = get_env('DB_HOST')
    port = get_env('DB_PORT')
    name = get_env('DB_NAME')
    user = get_env('DB_USER')
    password = get_env('DB_PASSWORD', '')

    if password == '':
        return f'mysql+pymysql://{user}@{host}:{port}/{name}'
    return f'mysql+pymysql://{user}:{password}@{host}:{port}/{name}'
