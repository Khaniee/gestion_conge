from sqlalchemy import (
    Column,
    String,
    Integer,
    Date,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from app.database.database import BaseEntity
from app.database.Employees import Employees


class Abscence(BaseEntity):
    __tablename__ = "abscence"
    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False,
        unique=True,
    )
    date_demande = Column(Date)
    motif = Column(String)
    date_debut = Column(Date)
    date_fin = Column(Date)
    valide = Column(String)

    id_employee = Column(Integer, ForeignKey(Employees.id))
    employee = relationship(
        "Employees", uselist=False, back_populates="abscences"
    )
