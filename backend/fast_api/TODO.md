# TODO

- [ ] Configurer le fichier d'environnement
- [ ] Creer les tables dans la base de donné:

    ```python
    (env) $ python3
    >>> from app.database.database import engine
    >>> from app.database.Users import User
    >>> User.__table__.create(engine)
    ```

- [ ] Creer un compte utilisateur 'User'
