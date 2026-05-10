import mysql.connector
import google.generativeai as genai
import json
import re

# --- 1. CONFIGURACIÓN ---
genai.configure(api_key="TU_API_KEY_AQUI")
modelo = genai.GenerativeModel("gemini-2.5-flash")

# Conexión a la base de datos
conexion = mysql.connector.connect(
    host="localhost",
    port=3308,
    user="root",
    password="root",
    database="tfg_xabi"
)
cursor = conexion.cursor(dictionary=True)

# --- 2. CREAR TABLA ---
# Quitamos la fecha de actualización y la fuente para hacerlo más simple
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
conexion.commit()

# --- 3. BUSCAR GIMNASIOS SIN DATOS ---
cursor.execute("""
    SELECT g.place_id, g.nombre, g.direccion 
    FROM gimnasios g 
    LEFT JOIN gimnasios_info gi ON g.place_id = gi.place_id 
    WHERE gi.place_id IS NULL
""")
gimnasios = cursor.fetchall()

print(f"🏋️ Gimnasios a procesar: {len(gimnasios)}")

# --- 4. PROCESAR UNO A UNO ---
for gym in gimnasios:
    nombre = gym['nombre']
    direccion = gym.get('direccion', 'Navarra, España')
    print(f"\nProcesando: {nombre}...")

    # El prompt es mucho más directo
    prompt = f"""
    Gimnasio: '{nombre}' en '{direccion}'. 
    Inventa una ficha realista. Devuelve SOLO un JSON con estas claves exactas:
    "tipo" (string), "servicios" (lista de 4 strings), "horario" (string), "precio" (numero entero), "descripcion" (string de 1 frase), "ambiente" (string).
    """

    try:
        # Preguntar a Gemini
        respuesta = modelo.generate_content(prompt)
        
        # Extraer SOLO lo que haya entre llaves { } para evitar fallos de formato
        texto_json = re.search(r'\{.*\}', respuesta.text, re.DOTALL).group()
        datos = json.loads(texto_json)
        
        # Guardar en base de datos
        cursor.execute("""
            INSERT INTO gimnasios_info (place_id, tipo, servicios, horario, precio, descripcion, ambiente)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            gym['place_id'], 
            datos.get('tipo'), 
            json.dumps(datos.get('servicios'), ensure_ascii=False), 
            datos.get('horario'), 
            datos.get('precio'), 
            datos.get('descripcion'), 
            datos.get('ambiente')
        ))
        conexion.commit()
        print(f" ✅ ¡Guardado! Tipo: {datos.get('tipo')} | Precio: {datos.get('precio')}€")

    except Exception as e:
        print(f" ❌ Error con {nombre}: {e}")

# --- 5. CERRAR TODO ---
cursor.close()
conexion.close()
print("\n¡Proceso terminado!")