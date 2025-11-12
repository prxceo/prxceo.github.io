from pydantic import BaseModel, EmailStr

# --- Правила для данных, которые мы ПОЛУЧАЕМ ---

# Что нужно для создания пользователя (регистрации)
class UserCreate(BaseModel):
    email: EmailStr  # Pydantic проверит, что это валидный email
    password: str

# --- Правила для данных, которые мы ОТДАЕМ ---

# Что мы возвращаем пользователю после успешной регистрации
class UserOut(BaseModel):
    id: int
    email: EmailStr

    # Это нужно, чтобы Pydantic мог читать данные из SQLAlchemy модели
    class Config:
        from_attributes = True