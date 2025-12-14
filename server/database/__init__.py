import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase


load_dotenv()

DATABASE_URI = os.environ.get('DATABASE_URI')
if DATABASE_URI is None:
    raise RuntimeError('DATABASE_URI não foi definida')

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)


class Base(DeclarativeBase):
    pass


def init_database():
    Base.metadata.create_all(engine)
