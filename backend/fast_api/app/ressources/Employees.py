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