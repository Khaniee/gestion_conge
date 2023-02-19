from pydantic import BaseModel
from enum import Enum

DEFAULT_PASSWORD = "default"


class UserPrivilege(str, Enum):
    UTILISATEUR: str = "utilisateur"
    RESPONSABLE: str = "responsable"


class Users(BaseModel):
    """Base for Users schema

    Attributes:
        login (str): login
        privilege (UserPrivilege): privilege
    """

    login: str
    privilege: UserPrivilege


class BaseUsers(Users):
    pass


class UsersIn(BaseUsers):
    """UserIn schema

    Attributes:
        login (str): login
        privilege (UserPrivilege): privilege
        password (str): raw password
    """

    password: str


class UsersOut(BaseUsers):
    """UserOut schema

    Attributes:
        login (str): login
        privilege (UserPrivilege): privilege
        id (int): privilege
    """

    id: int


class User(UsersOut):
    """User inside the system

    Attributes:
        login (str): login
        privilege (UserPrivilege): privilege
        id (int): privilege
        password (str): hashed_password
    """

    password: str
