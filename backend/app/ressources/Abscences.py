from fastapi import Depends
from sqlalchemy.orm import Session
from app.database.abscence import Abscence
from app.database.Employees import Employees
from app.schemas.Abscences import AbscencesIn
from sqlalchemy.exc import NoResultFound

from app.database.database import get_db


def get_abscences(db: Session):
    liste = db.query(Abscence).order_by(Abscence.id).all()
    for elt in liste:
        query = db.query(Employees).filter(Employees.id == elt.id_employee)
        try:
            elt.employee: Employees = query.one()
        except NoResultFound:
            elt.employee = None
    db.close()
    return liste


def all_abscence(db: Session) -> dict:
    liste = get_abscences(db)
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": liste,
    }
    return result


def add_abscence(demande: AbscencesIn, db: Session) -> dict:
    demandes = Abscence(**demande.dict())
    db.add(demandes)
    db.commit()
    db.close()
    result = {"status": "success", "message": "ajout effectué avec succes"}
    return result


def one_abscence(id: int, db: Session) -> dict:
    query = db.query(Abscence)
    query = query.filter(Abscence.id == id)
    liste: Abscence = query.one()
    query = db.query(Employees)
    query = query.filter(Employees.id == liste.id_employee)
    liste.employee: Employees = query.one()
    del liste.id_employee
    db.close()
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": liste,
    }
    return result


def update_abscence(
    abscence_id: int, abscence_data: AbscencesIn, db_session: Session
):
    query = db_session.query(Abscence)
    query = query.filter(Abscence.id == abscence_id)
    record: Abscence = query.one()
    record.date_demande = abscence_data.date_demande
    record.motif = abscence_data.motif
    record.date_debut = abscence_data.date_debut
    record.date_fin = abscence_data.date_fin
    record.id_employee = abscence_data.id_employee
    record.valide = abscence_data.valide

    db_session.commit()

    result = {"status": "success", "message": "update effectué avec succes"}

    return result


def remove_abscence(db_session: Session, abscence_id: int):
    query = db_session.query(Abscence)
    query = query.filter(Abscence.id == abscence_id)
    record: Abscence = query.one()

    db_session.delete(record)
    db_session.commit()

    result = {"status": "success", "message": "delete effectué avec succes"}

    return result
