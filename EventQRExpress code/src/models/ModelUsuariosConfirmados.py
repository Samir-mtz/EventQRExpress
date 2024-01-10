from .entities.UsuariosConfirmados import UsuariosConfirmados
class ModelUsuariosConfirmados():
    @classmethod
    def register(self, db, nombre, id_confirmacion, asiento):
        try:
            cursor = db.connection.cursor()
            sql = f"INSERT INTO usuarios_confirmados (nombre, id_confirmacion, asiento) VALUES ('{nombre}', '{id_confirmacion}', '{asiento}')"
            cursor.execute(sql)
            db.connection.commit()
            return "Succes"
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def consultAll(self, db, id): #Nota esta consulta es para obtener el registro que contengan la ubicacion que enviamos retorna un objeto de tipo locker
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id, asiento, nombre FROM usuarios_confirmados where id_confirmacion = '{id}'"
            cursor.execute(sql)
            list_confirmaciones=[]
            while True:
                row = cursor.fetchone()
                if row == None:
                    break
                list_confirmaciones.append( UsuariosConfirmados(id=row[0], asiento=row[1], nombre=row[2], id_confirmacion=id).to_dict())
            
            if len(list_confirmaciones)>0:
                return list_confirmaciones
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = f"DELETE FROM usuarios_confirmados WHERE id = {id}"
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)