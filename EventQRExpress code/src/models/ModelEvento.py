from .entities.Evento import Evento
class ModelEvento():
    @classmethod
    def register(self, db, nombre, fecha, horario, asistentes, tipo, lugar, id_usuario, id_salon):
        try:
            cursor = db.connection.cursor()
            sql = f"INSERT INTO evento (nombre, fecha, horario, asistentes, tipo, lugar, id_usuario, id_salon) VALUES ('{nombre}','{fecha}','{horario}', {asistentes},'{tipo}', '{lugar}', {id_usuario}, {id_salon})" #Cantidad va dos veces ya que en un inicio la disponibilidad es la misma
            # print(sql)
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)
            
    @classmethod
    def invitacion(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = f"select invitacion from evento where id_usuario = 'id';" #Tipo de invitacion
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return row[0]
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
            
    @classmethod
    def lastId(self, db):
        try:
            cursor = db.connection.cursor()
            sql = f"select MAX(id) as ultimo_id FROM evento;" #Tipo de invitacion
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return row[0]
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def datosEvento(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = f"select nombre, fecha, horario, asistentes, tipo, lugar, id_usuario, id from evento where id = '{id}';" #Tipo de invitacion
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return Evento(id=row[7], nombre=row[0], fecha=row[1], horario=row[2], asistentes=row[3], tipo=row[4], lugar=row[5], id_usuario=row[6], id_salon=None).to_dict()
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def datosEvento2(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = f"select nombre, fecha, horario, asistentes, tipo, lugar, id_usuario, id from evento where id = '{id}';" #Tipo de invitacion
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                # evento = 
                return Evento(id=row[7], nombre=row[0], fecha=row[1], horario=row[2], asistentes=row[3], tipo=row[4], lugar=row[5], id_usuario=row[6], id_salon=None)
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
