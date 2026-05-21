from fastapi import FastAPI
from contextlib import asynccontextmanager
from server.database import create_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_database()
    yield


app = FastAPI(lifespan=lifespan)
