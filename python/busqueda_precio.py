import mysql.connector
import google.generativeai as genai
import json
import re

API_KEY = "TU_API_KEY_AQUI" 
genai.configure(api_key=API_KEY)
modelo = genai.GenerativeModel("gemini-2.5-flash")

# conexion a la bd local
try:
    db = mysql.connector.connect(
        host="localhost",
        port=3308,
        user="root",
        password="root",
        database="tfg_xabi"
    )
    cursor = db.cursor(dictionary=True)
except Exception as e:
    print("Fallo al conectar a la bbdd:", e)
    exit()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS gimnasios_info (
        place_id VARCHAR(100) PRIMARY KEY,
        tipo VARCHAR(50),
        servicios TEXT,
        horario VARCHAR(50),
        precio DOUBLE,
        descripcion TEXT,
        ambiente VARCHAR(30),
        CONSTRAINT fk_gimnasios_info
            FOREIGN KEY (place_id) REFERENCES gimnasios(place_id)
            ON DELETE CASCADE ON UPDATE CASCADE
    )
""")
db.commit()


query_pendientes = """
    SELECT g.place_id, g.nombre, g.direccion 
    FROM gimnasios g 
    LEFT JOIN gimnasios_info gi ON g.place_id = gi.place_id 
    WHERE gi.place_id IS NULL
"""
cursor.execute(query_pendientes)
gyms_pendientes = cursor.fetchall()

print(f"Buscando info para {len(gyms_pendientes)} gimnasios...")

# bucle para rellenarlos con la ia
for gym in gyms_pendientes:
    nombre = gym['nombre']
    direccion = gym.get('direccion', 'Navarra, España') 
    print(f"-> Procesando {nombre} ...")


    prompt_texto = f"""
    Gimnasio: '{nombre}' en '{direccion}'. 
    Inventate una ficha realista. Solo devuelve el JSON, nada de markdown ni texto extra.
    Claves obligatorias: "tipo" (string), "servicios" (array de 4 strings), "horario" (string), "precio" (numero entero), "descripcion" (string corto), "ambiente" (string).
    """

    try:
        res = modelo.generate_content(prompt_texto)
        

        match = re.search(r'\{.*\}', res.text, re.DOTALL)
        if not match:
            print("   no se encontro formato json válido")
            continue
            
        datos_json = json.loads(match.group())
        
        insert_query = """
            INSERT INTO gimnasios_info (place_id, tipo, servicios, horario, precio, descripcion, ambiente)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        
        servicios_str = json.dumps(datos_json.get('servicios', []), ensure_ascii=False)
        
        valores = (
            gym['place_id'], 
            datos_json.get('tipo', 'Estándar'), 
            servicios_str, 
            datos_json.get('horario', 'Varios'), 
            datos_json.get('precio', 0), 
            datos_json.get('descripcion', ''), 
            datos_json.get('ambiente', 'Normal')
        )
        
        cursor.execute(insert_query, valores)
        db.commit()
        print(f"   ok! Guardado ({datos_json.get('precio')}€)")

    except Exception as e:
        print(f"   error rellenando {nombre} -> {e}")

cursor.close()
db.close()
print("\nFin del script.")