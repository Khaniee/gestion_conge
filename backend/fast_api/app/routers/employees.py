from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.ressources.Employees import all_employee, add_employee, update_employee, remove_employee, one_employee

from app.schemas.Employees import EmployeesIn

router = APIRouter(
    prefix="/api",
    tags = ["employees"],
    responses={404: {"description": "euuuuh..., not found"}}
)

@router.get("/employees")
async def main(db_session: Session = Depends(get_db)) -> dict:
    return all_employee(db_session)

@router.get("/employees/{id}")
async def main(id : int, db_session: Session = Depends(get_db)) -> dict:
    return one_employee(id, db_session)

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