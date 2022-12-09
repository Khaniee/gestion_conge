from app.database.database import BaseEntity
from sqlalchemy import Column, Integer, String, Float

class Employees(BaseEntity):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    job = Column(String, nullable=False)
    adress = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    id_user = Column(Integer, nullable=False)