from fastapi import FastAPI

# from sqlalchemy.orm import Session
# from schemas.personne import Personne
# from app.database.personne import Personne
# from app.database.database import SQL_ALCHEMY_URL, get_db
from fastapi.middleware.cors import CORSMiddleware
from app.routers import routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods= ['*'],
    allow_headers=['*']
)
app.include_router(routes.router)

@app.get("/")
async def index():
    return {"msg":"welcome to our api"}

# @app.get("/api/personnes")
# async def get_liste_personne():
#     db: Session = get_db()
#     liste = db.query(Personne).all()
#     db.close()
#     return liste
