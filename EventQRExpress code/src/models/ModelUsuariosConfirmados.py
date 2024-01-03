from .entities.Usuarios_confirmados import Usuarios_confirmados
class ModelUsuarios_confirmados():
    @classmethod
    def register(self, db, user):
        try:
            encrypted_password = User.generate_password(user.password)
            cursor = db.connection.cursor()
            sql = f"INSERT INTO usuarios (nombre, email, password, confirmed, asistentes, id_evento, invitacion ) VALUES ('{user.nombre}', '{user.email}', '{encrypted_password}', False, '{user.asistentes}', '{user.id_evento}', Null)"
            cursor.execute(sql)
            db.connection.commit()
            try:
                cursor = db.connection.cursor()
                sql = f"SELECT id, email, password, nombre FROM usuarios WHERE email = '{user.email}'"
                cursor.execute(sql)
                row = cursor.fetchone()
                if row != None:
                    user = Confirmaciones(id=row[0], email=row[1], password=User.check_password(row[2], user.password), nombre=row[3])
                    return user
                else:
                    return None
            except Exception as ex:
                raise Exception(ex)
        except Exception as ex:
            raise Exception(ex)