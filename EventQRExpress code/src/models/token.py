
from itsdangerous import URLSafeTimedSerializer, BadTimeSignature
from config import Config


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(Config.SECRET_KEY)
    return serializer.dumps(email, salt=Config.SECURITY_PASSWORD_SALT)


def confirm_token(token):
    serializer = URLSafeTimedSerializer(Config.SECRET_KEY)
    try:
        email = serializer.loads(
            token,
            salt=Config.SECURITY_PASSWORD_SALT,
            max_age=1500
        )
    except BadTimeSignature as e:
        
        print(f"Error al deserializar el token: {e}")
        return False
    except Exception as e:
        
        print(f"Error inesperado al deserializar el token: {e}")
        return False
    return email