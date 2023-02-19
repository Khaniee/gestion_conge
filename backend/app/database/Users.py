from app.database.database import BaseEntity
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship


class Users(BaseEntity):
    """Users

    Attributes:
        id (int): ID
        login (str): login
        password (str): hashed password
        privilege (str): privilege of the users
    """

    __tablename__ = "user"
    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False,
        unique=True,
    )
    login = Column(String, nullable=False)
    password = Column(String, nullable=False)
    privilege = Column(String, nullable=False)

    employee = relationship("Employees", back_populates="user", uselist=False)
