from pydantic import BaseModel


class RefreshTokenForm(BaseModel):
    refresh_token: str


class TokenSchema(BaseModel):
    """Token schema

    Attributes:
        access_token (str): Access Token
        refresh_token (str): Refresh Token
    """

    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    """Token payload

    Attributes:
        sub (str): Sub
        exp (int): Exp
    """

    sub: str = None
    exp: int = None
