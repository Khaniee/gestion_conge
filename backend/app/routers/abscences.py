from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.ressources.Abscences import all_abscence, add_abscence, update_abscence, remove_abscence, one_abscence

from app.schemas.Abscences import AbscencesIn

router = APIRouter(
    prefix="/api",
    tags = ["abscences"],
    responses={404: {"description": "euuuuh..., not found"}}
)

@router.get("/abscences")
async def main(db: Session = Depends(get_db)) -> dict:
    return all_abscence(db)

@router.get("/abscences/{id}")
async def main(id : int, db_session: Session = Depends(get_db)) -> dict:
    return one_abscence(id, db_session)

@router.post('/abscences')
async def main(demande: AbscencesIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_abscence(demande, db_session)
    return result

@router.put('/abscences/{id}')
async def main(id: int, demande: AbscencesIn, db: Session = Depends(get_db)) -> dict:
    result = update_abscence(id, demande, db)
    return result

@router.delete('/abscences/{id}')
async def main(id:int, db: Session = Depends(get_db))-> dict:
    result = remove_abscence(db , id)
    return result