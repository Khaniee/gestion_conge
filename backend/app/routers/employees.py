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
async def get_all(db_session: Session = Depends(get_db)) -> dict:
    return all_employee(db_session)

@router.post('/employees')
async def create(employee_serializer: EmployeesIn, db_session: Session = Depends(get_db)) -> dict:
    employee = add_employee(employee_serializer, db_session)
    return employee

@router.get("/employees/{id}")
async def get(id : int, db_session: Session = Depends(get_db)) -> dict:
    return one_employee(id, db_session)

@router.put('/employees/{id}')
async def update(id: int, demande: EmployeesIn, db: Session = Depends(get_db)) -> dict:
    result = update_employee(id, demande, db)
    return result

@router.delete('/employees/{id}', status_code=204)
async def delete(id:int, db: Session = Depends(get_db))-> dict:
    remove_employee(db , id)
