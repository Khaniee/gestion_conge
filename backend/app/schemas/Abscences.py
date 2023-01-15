from pydantic import BaseModel
from datetime import date

class Abscences(BaseModel):
    date_demande : date
    motif : str
    date_debut : date
    date_fin : date
    id_employee : int 
    valide : str

class AbscencesIn(Abscences):
    pass

class AbscencesOut(Abscences):
    id : int
