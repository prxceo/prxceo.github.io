from passlib.context import CryptContext

# Создаем контекст, указывая, что мы используем bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Функция для хэширования пароля
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Функция для проверки пароля
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)