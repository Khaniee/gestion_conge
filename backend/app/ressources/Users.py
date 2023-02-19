# pylint: disable=missing-module-docstring

from sqlalchemy.orm import Session, Query

from app.schemas.Users import UsersIn
from app.database.Users import Users
from app.utils import get_hashed_password


def all_user(db: Session) -> dict:
    liste = db.query(Users).all()
    db.close()
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": liste,
    }
    return result


def one_user(id: int, db: Session) -> dict:
    query = db.query(Users)
    query = query.filter(Users.id == id)
    liste: Users = query.one()
    db.close()
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": liste,
    }
    return result


def get_user(id: int, db_session: Session) -> Users:
    """Retourne une instance de l'utilisateur avec l'ID correspondant"""
    query = db_session.query(Users).filter(Users.id == id)
    user: Users = query.one()
    return user


def get_user_by_login(login: str, db_session: Session) -> Users:
    """Retourne une instance de l'utilisateur qui correspond au nom"""
    query: "Query" = db_session.query(Users).filter(Users.login == login)
    user: Users = query.one_or_none()
    return user


def add_user(user_serializer: UsersIn, db_session: Session) -> Users:
    """Creer un utilisateur et retourn l'instance crée"""
    user = Users(**user_serializer.dict())
    user.password = get_hashed_password(user.password)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    return user


def update_user(user_id: int, user_data: UsersIn, db_session: Session):
    query = db_session.query(Users)
    query = query.filter(Users.id == user_id)
    record: Users = query.one()

    record.login = user_data.login
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
