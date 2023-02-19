from typing import List

from pydantic import BaseModel

from app.schemas.Abscences import AbscencesOut


class Employees(BaseModel):
    firstname: str
    lastname: str
    id_user: int
    job: str
    adress: str
    contact: str


class EmployeesIn(Employees):
    pass


class EmployeesOut(Employees):
    id: int
    abscences: List[AbscencesOut] = []

    class Config:
        orm_mode = True


class EmployeesList(BaseModel):
    __root__: List[EmployeesOut]
