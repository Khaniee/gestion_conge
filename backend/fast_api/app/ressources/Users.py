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

def update_user( user_id: int, user_data: UsersIn, db_session: Session):
    query = db_session.query(Users)
    query = query.filter(Users.id == user_id)
    record: Users = query.one()
    
    record.login = user_data.login
    record.password = user_data.password
    record.privilege = user_data.privilege
    
    db_session.commit()
    
    result = {"status": "success", "message": "update effectué avec succes"}

    return result

def remove_user(db_session: Session, user_id: int):
    query = db_session.query(Users)
    query = query.filter(Users.id == user_id)
    record: Users = query.one()
    
    db_session.delete(record)
    db_session.commit()
    
    result = {"status": "success", "message": "delete effectué avec succes"}

    return result