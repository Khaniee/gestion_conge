from app.database.database import BaseEntity
from sqlalchemy import Column, Integer, String, Float

class Users(BaseEntity):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    login = Column(Integer, nullable = False)
    password = Column(String, nullable = False)
    privilege = Column(String, nullable = False)