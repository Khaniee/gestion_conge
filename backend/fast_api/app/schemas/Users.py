from pydantic import BaseModel

class Users(BaseModel):
    login : str
    password : str
    privilege : str
    
class UsersIn(Users):
    pass

class UsersOut(Users):
    id : int