from app.schemas.Employees import EmployeesIn, EmployeesOut
from app.database.Employees import Employees

from sqlalchemy.orm import Session
# from fastapi import status

def all_employee(db: Session) -> dict:
    liste = db.query(Employees).all()
    db.close()
    result = {"status": "success","message" : "affichage effectué avec succes","data":liste}
    return result


def add_employee(demande: EmployeesIn, db: Session) -> dict:
    demandes = Employees(**demande.dict())
    db.add(demandes)
    db.commit()
    db.close()
    result = {"status": "success", "message": "ajout effectué avec succes"}

    return result

def update_employee(db_session: Session, employee_id: int, employee_data: EmployeesIn):
    query = db_session.query(Employees)
    query = query.filter(Employees.id == employee_id)
    record: Employees = query.one()
    
    record.firstname = employee_data.firstname
    record.lastname = employee_data.lastname
    record.job = employee_data.job
    record.adress = employee_data.adress
    record.contact = employee_data.contact
    record.id_user = employee_data.id_user
    
    db_session.commit()
    
    result = {"status": "success", "message": "update effectué avec succes"}

    return result

# def addEmployee(demande: EmployeesOut, db: Session) -> dict:
#     demandes = Employees(**demande.dict())
#     db.add(demandes)
#     db.commit()
#     db.close()
#     result = {"status": "success", "message": "ajout effectué avec succes"}

#     return result

# def addEmployee(demande: EmployeesOut, db: Session) -> dict:
#     demandes = Employees(**demande.dict())
#     db.add(demandes)
#     db.commit()
#     db.close()
#     result = {"status": "success", "message": "ajout effectué avec succes"}

#     return result