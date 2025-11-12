from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# АДРЕС ПОДКЛЮЧЕНИЯ ИЗМЕНИЛСЯ! (теперь psycopg2)
DATABASE_URL = "postgresql+psycopg2://user:password@localhost/prx_db"

# Создаем "движок" (уже не async)
engine = create_engine(DATABASE_URL)

# Создаем "фабрику сессий" (уже не async)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для всех наших моделей (таблиц)
Base = declarative_base()