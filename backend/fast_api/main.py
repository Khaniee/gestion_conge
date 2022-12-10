from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import abscences, employees, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods= ['*'],
    allow_headers=['*']
)
app.include_router(employees.router)
app.include_router(abscences.router)
app.include_router(users.router)

@app.get("/")
async def index():
    return {"msg":"welcome to our api"}
