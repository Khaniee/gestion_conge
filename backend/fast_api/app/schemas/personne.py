from pydantic import BaseModel

class Personne(BaseModel):
    name: str
    age: int