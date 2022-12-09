from app.schemas.Users import UsersIn, UsersOut
from app.database.Users import Users

from sqlalchemy.orm import Session

def all_user(db : Session) -> dict:
    liste = db.query(Users).all()
    db.close()
    result = {"status": "success","message" : "affichage effectué avec succes","data":liste}
    return result

def add_user(demande: UsersIn, db : Session) -> dict:
    demandes = Users(**demande.dict())
    db.add(demandes)
    db.commit()
    db.close()
    result = {"status": "success", "message": "ajout effectué avec succes"}
    return result