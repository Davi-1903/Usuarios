from typing import Any, Generator
from sqlmodel import SQLModel, create_engine, Session
from utils import get_env


DATABASE_URI = get_env('DATABASE_URI')
engine = create_engine(DATABASE_URI, connect_args={'check_same_thread': False})


def create_database():
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session
