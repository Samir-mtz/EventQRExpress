
class Config:
    SECRET_KEY = 'B!1w8NAt1T^%kvhUI*S^'
    SECURITY_PASSWORD_SALT = 'my_precious_two'

class DevelopmentConfig(Config):
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'admin123'
    MYSQL_DB = 'eventqrxpress' #Nombre de la base de datos

config = {
    'development': DevelopmentConfig
}
