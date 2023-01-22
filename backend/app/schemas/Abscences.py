from enum import Enum

from pydantic import BaseModel
from datetime import date

class AbscencesStatus(str, Enum):
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    PENDING = "pending"

class Abscences(BaseModel):
    date_demande : date
    motif : str
    date_debut : date
    date_fin : date
    id_employee : int 
    valide : AbscencesStatus

class AbscencesIn(Abscences):
    pass

class AbscencesOut(Abscences):
    id : int
