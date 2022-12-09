from pydantic import BaseModel

class Employees(BaseModel):
    firstname: str
    lastname: str
    id_user: int
    job : str
    adress : str
    contact : str

class EmployeesIn(Employees):
    pass

class EmployeesOut(Employees):
    id : int