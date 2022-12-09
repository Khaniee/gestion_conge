from sqlalchemy.orm import Session
from app.database.Abscence import Abscence
from app.schemas.Abscences import AbscencesIn, AbscencesOut

def all_abscence(db : Session) -> dict:
    liste = db.query(Abscence).all()
    db.close()
    result = {"status": "success","message" : "affichage effectué avec succes","data":liste}
    return result

def add_abscence(demande : AbscencesIn, db : Session) -> dict:
    demandes = Abscence(**demande.dict())
    db.add(demandes)
    db.commit()
    db.close()
    result = {"status": "success", "message": "ajout effectué avec succes"}
    return result