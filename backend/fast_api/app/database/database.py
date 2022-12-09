from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

# SQL_ALCHEMY_URL = "bdd_type+driver://username:password@host:port/bdd_name"
SQL_ALCHEMY_URL = f"postgresql://{config('DB_USERNAME')}:{config('DB_PASSWORD')}@{config('DB_HOST')}:{config('DB_PORT')}/{config('DB_NAME')}"

engine = create_engine(SQL_ALCHEMY_URL)

Session = scoped_session(sessionmaker(
    bind=engine,
    autoflush= False,
    autocommit = False
))

def get_db():
    """Get the database session"""
    try:
        db = Session()
        return db
    except Exception as e:
        db_cnx = { 'status': False, 'error': e }
        db.close()
        return db_cnx
    finally:
        db.close()

BaseEntity = declarative_base()
