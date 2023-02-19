from typing import Union

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.database.database import get_db
from app.ressources.Employees import (
    all_employee,
    add_employee,
    update_employee,
    remove_employee,
    one_employee,
    get_employee,
)
from app.schemas.Employees import EmployeesIn


class ErrorSchema(BaseModel):
    type: str = "about:blank"
    title: Union[str, None]
    status: int
    detail: str
    instance: str


router = APIRouter(
    prefix="/api",
    tags=["employees"],
    responses={404: {"description": "euuuuh..., not found"}},
)


@router.get("/employees/{id}/abscences")
async def abscences_of_employees(
    id: int, db: Session = Depends(get_db)
) -> dict:
    employee = get_employee(id, db)
    if employee:
        return employee.abscences
    raise HTTPException(
        status.HTTP_404_NOT_FOUND,
        detail=ErrorSchema(
            title="EMPLOYEE NOT FOUND",
            status=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id:{id} has not been found on the database.",
            instance=f"{id}",
        ).dict(),
    )


@router.get("/employees")
async def get_all(db_session: Session = Depends(get_db)) -> dict:
    return all_employee(db_session)


@router.post("/employees")
async def create(
    employee_serializer: EmployeesIn, db_session: Session = Depends(get_db)
) -> dict:
    employee = add_employee(employee_serializer, db_session)
    return employee


@router.get("/employees/{id}")
async def get(id: int, db_session: Session = Depends(get_db)) -> dict:
    return one_employee(id, db_session)


@router.put("/employees/{id}")
async def update(
    id: int, demande: EmployeesIn, db: Session = Depends(get_db)
) -> dict:
    result = update_employee(id, demande, db)
    return result


@router.delete("/employees/{id}", status_code=204)
async def delete(id: int, db: Session = Depends(get_db)) -> dict:
    remove_employee(db, id)
