from .entities.Confirmaciones import Confirmaciones
from .entities.User import User

class ModelConfirmaciones():
    @classmethod
    def register(self, db, user):
        try:
            encrypted_password = User.generate_password(user.password)
            cursor = db.connection.cursor()
            sql = f"INSERT INTO confirmaciones (nombre, email, password, confirmed, asistentes, id_evento, invitacion ) VALUES ('{user.nombre}', '{user.email}', '{encrypted_password}', False, '{user.asistentes}', '{user.id_evento}', 'Null')"
            print(sql)
            cursor.execute(sql)
            db.connection.commit()
            try:
                cursor = db.connection.cursor()
                sql = f"SELECT id, email, password, nombre FROM usuarios WHERE email = '{user.email}'"
                cursor.execute(sql)
                row = cursor.fetchone()
                if row != None:
                    user = Confirmaciones(id=row[0], email=row[1], password=User.check_password(row[2], user.password), nombre=row[3], confirmed=False, asistentes="", id_evento="")
                    return user
                else:
                    return None
            except Exception as ex:
                raise Exception(ex)
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def check_email(self, db, email):
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id, nombre FROM confirmaciones WHERE email = '{email}'"
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def consulta_email(self, db, email):
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id, confirmed, nombre FROM confirmaciones WHERE email = '{email}'"
            print(sql)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return Confirmaciones(password=None,id=row[0], confirmed=row[1], nombre=row[2], email="", asistentes="", id_evento="")
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def confirm_user(self, db, email):
        try:
            cursor = db.connection.cursor()
            sql = f"UPDATE confirmaciones SET confirmed=1 WHERE email='{email}'"
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)   