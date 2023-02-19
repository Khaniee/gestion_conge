from typing import Union, Any
from datetime import datetime

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.utils import ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY
from app.schemas.token import TokenPayload
from app.schemas.Users import User
from app.database.database import get_db
from app.database.Users import Users
from app.ressources.Users import get_user_by_login

reusable_oauth = OAuth2PasswordBearer(tokenUrl="/login", scheme_name="JWT")


def verify_token(token, jwt_secret) -> TokenPayload:
    try:
        payload = jwt.decode(token, jwt_secret, algorithms=[ALGORITHM])
    except jwt.JWTError:
        payload = None

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Token",
        )

    try:
        token_data = TokenPayload(**payload)
    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    if datetime.fromtimestamp(token_data.exp) < datetime.now():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return token_data


def verify_refresh_token(refresh_token: str):
    return verify_token(refresh_token, JWT_REFRESH_SECRET_KEY)


async def get_current_user(
    db_session: Session = Depends(get_db), token: str = Depends(reusable_oauth)
) -> Users:
    token_data: TokenPayload = verify_token(token, JWT_SECRET_KEY)

    user: Union[Users, None] = get_user_by_login(token_data.sub, db_session)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Could not find user"
        )
    user.employee
    return user
