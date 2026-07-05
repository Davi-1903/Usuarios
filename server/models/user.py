from sqlmodel import SQLModel, Field
from pydantic import EmailStr


class User(SQLModel, table=True):
    __tablename__ = 'users'  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, nullable=False)
    email: EmailStr = Field(max_length=100, nullable=False, unique=True)
    password: str = Field(max_length=255, nullable=False)
