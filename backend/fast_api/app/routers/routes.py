from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.ressources.Employees import all_employee, add_employee, update_employee, remove_employee
from app.ressources.Users import all_user, add_user, update_user, remove_user
from app.ressources.Abscences import all_abscence, add_abscence, update_abscence, remove_abscence

from app.schemas.Employees import EmployeesIn
from app.schemas.Users import UsersIn
from app.schemas.Abscences import AbscencesIn

router = APIRouter(
    prefix="/api",
    tags = ["employees"],
    responses={404: {"description": "euuuuh..., not found"}}
)

@router.get("/employees")
async def main(db_session: Session = Depends(get_db)) -> dict:
    return all_employee(db_session)

@router.post('/employees')
async def main(demande: EmployeesIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_employee(demande, db_session)
    return result

@router.post('/employees/edit/{id}')
async def main(id: int, demande: EmployeesIn, db: Session = Depends(get_db)) -> dict:
    result = update_employee(id, demande, db)
    return result

@router.post('/employees/drop/{id}')
async def main(id:int, db: Session = Depends(get_db))-> dict:
    result = remove_employee(db , id)
    return result

@router.get("/users")
async def main(db_session: Session = Depends(get_db)) -> dict:
    return all_user(db_session)

@router.post('/users')
async def main(demande: UsersIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_user(demande, db_session)
    return result

@router.post('/users/edit/{id}')
async def main(id: int, demande: UsersIn, db: Session = Depends(get_db)) -> dict:
    result = update_user(id, demande, db)
    return result

@router.post('/users/drop/{id}')
async def main(id:int, db: Session = Depends(get_db))-> dict:
    result = remove_user(db , id)
    return result

@router.get("/abscences")
async def main(db: Session = Depends(get_db)) -> dict:
    return all_abscence(db)

@router.post('/abscences')
async def main(demande: AbscencesIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_abscence(demande, db_session)
    return result

@router.post('/abscences/edit/{id}')
async def main(id: int, demande: AbscencesIn, db: Session = Depends(get_db)) -> dict:
    result = update_abscence(id, demande, db)
    return result

@router.post('/abscences/drop/{id}')
async def main(id:int, db: Session = Depends(get_db))-> dict:
    result = remove_abscence(db , id)
    return result