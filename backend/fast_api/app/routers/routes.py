from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.ressources.Employees import all_employee, add_employee
from app.ressources.Users import all_user, add_user
from app.ressources.Abscences import all_abscence, add_abscence

from app.schemas.Employees import EmployeesIn
from app.schemas.Users import UsersIn
from app.schemas.Abscences import AbscencesIn

router = APIRouter(
    prefix="/api",
    tags = ["employees"],
    responses={404: {"description": "euuuuh..., not found"}}
)

@router.get("/employees")
async def get_employees(db_session: Session = Depends(get_db)) -> dict:
    return all_employee(db_session)

@router.post('/employees')
async def create_employees(demande: EmployeesIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_employee(demande, db_session)
    return result

@router.get("/users")
async def get_users(db_session: Session = Depends(get_db)) -> dict:
    return all_user(db_session)

@router.post('/users')
async def create_users(demande: UsersIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_user(demande, db_session)
    return result

@router.get("/abscences")
async def get_abscences(db: Session = Depends(get_db)) -> dict:
    return all_abscence(db)

@router.post('/abscences')
async def create_abscences(demande: AbscencesIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_abscence(demande, db_session)
    return result

# @router.get("/abscences")
# async def getAbscences(db: Session = Depends(get_db)) -> dict:
#     return getAllEmployees(db)