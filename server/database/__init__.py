from typing import Any, Generator
from sqlmodel import SQLModel, Session
from utils import get_engine, create_url


DATABASE_URI = create_url()
DATABASE_URI = 'sqlite:///app.db'
engine = get_engine(url=DATABASE_URI, echo=False)


def create_database():
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session
