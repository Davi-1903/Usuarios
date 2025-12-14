import os
from time import sleep
from dotenv import load_dotenv
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy.exc import OperationalError


def get_connection(DATABASE_URI: str) -> Engine:
    for _ in range(10):
        try:
            engine = create_engine(DATABASE_URI)
            engine.connect()
            return engine
        except OperationalError:
            sleep(3)
    else:
        raise RuntimeError('O MySQL não subiu. Desisto.\nAss: Flask')

load_dotenv()

DATABASE_URI = os.environ.get('DATABASE_URI')
if DATABASE_URI is None:
    raise RuntimeError('DATABASE_URI não foi definida')

engine = get_connection(DATABASE_URI)    
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)


class Base(DeclarativeBase):
    pass


def init_database():
    Base.metadata.create_all(engine)
