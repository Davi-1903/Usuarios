from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import create_database

from controllers import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
