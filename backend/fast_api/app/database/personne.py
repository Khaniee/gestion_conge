from app.database.database import BaseEntity
from sqlalchemy import Column, String, Integer

class Personne(BaseEntity):
    __tablename__ = "personnes"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=True, default=None)
    