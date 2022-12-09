from app.database.database import BaseEntity
from sqlalchemy import Column, String, Integer, Date

class Abscence(BaseEntity):
    __tablename__ = "abscence"
    id = Column(Integer, primary_key = True, autoincrement = True, nullable = False, unique = True)
    date_demande = Column(Date)
    motif = Column(String)
    date_debut = Column(Date)
    date_fin = Column(Date)
    id_employee = Column(Integer)
    valide = Column(String)