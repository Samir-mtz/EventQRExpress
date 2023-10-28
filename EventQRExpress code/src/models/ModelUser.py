from .entities.User import User
import datetime

class ModelUser():
    @classmethod
    def login(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql = """SELECT id, email, password, nombre FROM usuarios 
                    WHERE email = '{}'""".format(user.email)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                user = User(id = row[0], email = row[1], password= User.check_password(row[2], user.password), nombre = row[3])
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def get_by_id(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = "SELECT id, email, nombre FROM usuarios WHERE id = {}".format(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return User(id = row[0], email = row[1], nombre = row[2])
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def register(self, db, user):
        try:
            encrypted_password = User.generate_password(user.password)
            cursor = db.connection.cursor()
            sql = f"INSERT INTO usuarios (nombre, email, telefono, password, tipo, confirmed) VALUES ('{user.nombre}', '{user.email}','{user.telefono}', '{encrypted_password}', 'usuario', False)"
            cursor.execute(sql)
            db.connection.commit()
            try:
                cursor = db.connection.cursor()
                sql = """SELECT id, email, password, nombre FROM usuarios 
                        WHERE email = '{}'""".format(user.email)
                cursor.execute(sql)
                row = cursor.fetchone()
                if row != None:
                    user = User(id=row[0], email=row[1], password=User.check_password(row[2], user.password), nombre=row[3])
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
            sql = "SELECT id, nombre FROM usuarios WHERE email = '{}'".format(email)
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
            sql = "SELECT id, confirmed, nombre, tipo, confirmed_on FROM usuarios WHERE email = '{}'".format(email)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return User(password=None,id=row[0], confirmed=row[1], nombre=row[2], tipo=row[3], confirmed_on=row[4])
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
    
    
    @classmethod
    def consulta_telefono(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = "SELECT telefono FROM usuarios WHERE id =" + str(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return row[0]
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def confirm_user(self, db, email):
        try:
            cursor = db.connection.cursor()
            sql = "UPDATE usuarios SET confirmed=1, confirmed_on=CURDATE() WHERE email='" + email + "';"
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)    
    
    
    @classmethod
    def delete(self, db, id_user):
        try:
            cursor = db.connection.cursor()
            sql = 'DELETE FROM usuarios WHERE id ='+ id_user
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_cliente(self, db, id_recibido, nombre, email, telefono, direccion): #Nota al incrementar la cantidad de locker la disponibilidad cambia, este dato se debe de corregir en el objeto que se envie(diccionario)
        try:
            cursor = db.connection.cursor()
            sql = 'UPDATE usuarios SET nombre="'+nombre+'", email="'+email+'", telefono="'+telefono+'" WHERE id='+id_recibido
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_contrasena(self, db, id_recibido, contrasena): #Nota al incrementar la cantidad de locker la disponibilidad cambia, este dato se debe de corregir en el objeto que se envie(diccionario)
        try:
            encrypted_password = User.generate_password(contrasena)
            cursor = db.connection.cursor()
            sql = 'UPDATE usuarios SET password="'+encrypted_password+'" WHERE id='+id_recibido
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def modificar_estado(self, db, id_user, estado):
        try:
            cursor = db.connection.cursor()
            sql = 'UPDATE usuarios SET confirmed="'+str(estado)+'" WHERE id='+id_user
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)