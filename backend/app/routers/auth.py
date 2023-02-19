from typing import Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.Users import Users
from app.ressources.Users import get_user_by_login
from app.schemas.auth import (
    AuthIn,
)
from app.schemas.token import TokenSchema, TokenPayload, RefreshTokenForm
from app.schemas.Users import UsersOut, User
from app.utils import verify_password, create_access_token, create_refresh_token
from app.deps import get_current_user, verify_refresh_token

router = APIRouter(
    tags=["auth"], responses={404: {"description": "euuuuh..., not found"}}
)


def authenticate_user(
    login: str, password: str, db_session: Session
) -> Union[Users, bool]:
    """Authenticate an user from the database

    Args:
        login (str): login of user.
        password (str): password of user.
        db_session (Session): session to access the database.

    Returns:
        Union[Users, bool]:
    """
    user = get_user_by_login(login, db_session)
    if user and verify_password(password, user.password):
        return user
    return False


@router.post("/login")
async def post_auth_login(
    request: AuthIn, db_session: Session = Depends(get_db)
):
    authentified_user = authenticate_user(
        request.login, request.password, db_session
    )
    if not authentified_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect login or password",
        )

    return TokenSchema(
        access_token=create_access_token(authentified_user.login),
        refresh_token=create_refresh_token(authentified_user.login),
    )


@router.post("/refresh-token")
async def refresh(refresh_token_form: RefreshTokenForm):
    token_payload = verify_refresh_token(refresh_token_form.refresh_token)
    return TokenSchema(
        access_token=create_access_token(token_payload.sub),
        refresh_token=create_refresh_token(token_payload.sub),
    )


@router.get("/whoami")
async def whoami(user: Users = Depends(get_current_user)):
    return user
