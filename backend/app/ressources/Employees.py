from pprint import pprint

from sqlalchemy.orm import Session, Query
from sqlalchemy.exc import NoResultFound

from app.schemas.Employees import EmployeesIn, EmployeesOut
from app.database.Employees import Employees
from app.database.Users import Users
from app.ressources.Users import (
    add_user,
    update_user,
    remove_user,
    get_user,
)
from app.schemas.Users import UsersIn, UserPrivilege, DEFAULT_PASSWORD


def get_employees(db: Session):
    liste = db.query(Employees).order_by(Employees.id).all()
    for elt in liste:
        elt: "Employees"
        elt.user
        # query = db.query(Users)
        # query = query.filter(Users.id == elt.id_user)
        # try:
        #     elt.user: Users = query.one()
        # except NoResultFound:
        #     elt.user = None
    return liste


def all_employee(db: Session) -> dict:
    liste = get_employees(db)
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": liste,
    }
    return result


def get_employee(id: int, db: Session):
    query: Query = db.query(Employees)
    query = query.filter(Employees.id == id)
    employee: Employees = query.one_or_none()
    return employee


def one_employee(id: int, db: Session) -> dict:
    employee = get_employee(id, db)
    db.close()
    result = {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": employee,
    }
    return result


def to_lower_case_with_dot(string: str) -> str:
    """example: 'John Doe' will be 'john.doe'"""
    return string.strip().lower().replace(" ", ".")


def create_user_login(firstname, lastname):
    """création du login de l'utilisateur

    example: "John" "Doe" will be "john.doe"
    """
    return f"{to_lower_case_with_dot(firstname)}.{to_lower_case_with_dot(lastname)}"


def add_employee(
    employee_serializer: EmployeesIn, db_session: Session
) -> Employees:
    """Crée un employée et retourne l'instance de ce dernier.

    NB: L'utilisation de cette api crée automatiquement l'utilisateur correspondant
    """
    user_login = create_user_login(
        employee_serializer.firstname, employee_serializer.lastname
    )
    print(f"[add_employee] user login just created: `{user_login}`")

    # création de l'utilisateur
    user_serializer = UsersIn(
        login=user_login,
        password=DEFAULT_PASSWORD,
        privilege=UserPrivilege.UTILISATEUR.value,
    )
    user = add_user(user_serializer, db_session)
    print("[add_employee] user have been created:")
    pprint(vars(user))

    # création de l'employée
    print(f"[add_employee] assign id_user of employee to: `{user.id}`")
    employee_serializer.id_user = user.id
    employee = Employees(**employee_serializer.dict())
    db_session.add(employee)
    print("[add_employee] employee have been created:")
    pprint(vars(user))

    # commit() des changement sur l'employee
    db_session.commit()
    db_session.refresh(employee)

    # remplacer 'id_user' par 'user'
    user_query = db_session.query(Users).filter(Users.id == employee.id_user)
    employee.user = user_query.one()
    del employee.id_user

    print("[add_employee] employee to return from api:")
    pprint(vars(employee))

    return employee


def update_employee(
    employee_id: int, employee_data: EmployeesIn, db_session: Session
):
    query = db_session.query(Employees)
    query = query.filter(Employees.id == employee_id)
    record: Employees = query.one()

    # mise a jour des attributs
    record.firstname = employee_data.firstname
    record.lastname = employee_data.lastname
    record.job = employee_data.job
    record.adress = employee_data.adress
    record.contact = employee_data.contact
    record.id_user = employee_data.id_user

    db_session.commit()
    db_session.refresh(record)

    # mise a jour de l'utilisateur
    user = get_user(record.id_user, db_session)
    user_serializer = UsersIn(
        login=create_user_login(record.firstname, record.lastname),
        password=user.password,
        privilege=user.privilege,
    )
    update_user(user.id, user_serializer, db_session)

    # remplacer 'id_user' par 'user'
    user_query = db_session.query(Users).filter(Users.id == record.id_user)
    record.user = user_query.one()
    del record.id_user

    return record


def remove_employee(db_session: Session, employee_id: int):
    query = db_session.query(Employees).filter(Employees.id == employee_id)
    record: Employees = query.one()

    # supression de l'utilisateur
    remove_user(db_session, record.id_user)

    # supression de l'employée
    db_session.delete(record)

    # commit() des changement
    db_session.commit()

    return True
