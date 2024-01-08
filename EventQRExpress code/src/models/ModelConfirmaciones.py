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
            sql = f"SELECT id, confirmed, nombre, id_evento, asistentes FROM confirmaciones WHERE email = '{email}'"
            print(sql)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return Confirmaciones(password=None,id=row[0], confirmed=row[1], nombre=row[2], email="", asistentes=row[4], id_evento=row[3])
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
    
    @classmethod
    def consultAll(self, db, id): #Nota esta consulta es para obtener el registro que contengan la ubicacion que enviamos retorna un objeto de tipo locker
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id, nombre, email, asistentes FROM confirmaciones where confirmed = '1' and id_evento = '{id}'"
            cursor.execute(sql)
            list_confirmaciones=[]
            while True:
                row = cursor.fetchone()
                if row == None:
                    break
                confirmacion = Confirmaciones(password="None",id=row[0], confirmed="", nombre=row[1], email=row[2], asistentes=row[3], id_evento="")
                list_confirmaciones.append(confirmacion.to_dict())
            
            if len(list_confirmaciones)>0:
                return list_confirmaciones
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
            
    @classmethod
    def get_by_id(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id, email, nombre FROM confirmaciones WHERE id = '{id}'"
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return Confirmaciones(password="None",id=row[0], confirmed="", nombre=row[2], email=row[1], asistentes="", id_evento="")
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = 'DELETE FROM confirmaciones WHERE id ='+ id
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)