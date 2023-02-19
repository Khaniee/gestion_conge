from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.Users import UsersIn
from app.ressources.Users import (
    all_user,
    add_user,
    update_user,
    remove_user,
    one_user,
)

router = APIRouter(
    prefix="/api",
    tags=["users"],
    responses={404: {"description": "euuuuh..., not found"}},
)


@router.get("/users")
async def main(db_session: Session = Depends(get_db)) -> dict:
    return all_user(db_session)


@router.get("/users/{id}")
async def main(id: int, db_session: Session = Depends(get_db)) -> dict:
    return one_user(id, db_session)


@router.post("/users")
async def main(demande: UsersIn, db_session: Session = Depends(get_db)) -> dict:
    result = add_user(demande, db_session)
    return result


@router.post("/users/edit/{id}")
@router.put("/users/{id}")
async def put_user(
    id: int, demande: UsersIn, db: Session = Depends(get_db)
) -> dict:
    result = update_user(id, demande, db)
    return result


@router.post("/users/drop/{id}")
@router.delete("/users/{id}")
async def delete_user(id: int, db: Session = Depends(get_db)) -> dict:
    result = remove_user(db, id)
    return result
