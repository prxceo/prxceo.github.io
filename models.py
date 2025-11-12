# Убедись, что в models.py код такой:
from sqlalchemy import Column, Integer, String
from database import Base  # <--- БЕЗ ТОЧКИ

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)