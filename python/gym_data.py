import requests
import mysql.connector
import time

API_KEY = 'another day será'

DB_CONFIG = {
    'host': 'localhost',
    'port': 3308,
    'user': 'root',      
    'password': 'root',      
    'database': 'tfg_xabi'
}


MUNICIPIOS = [
    'Pamplona', 'Tudela', 'Barañáin', 'Burlada', 'Estella', 
    'Zizur Mayor', 'Tafalla', 'Ansoáin', 'Villava', 'Corella', 
    'Noáin', 'Cintruénigo', 'Alsasua', 'Valle de Egüés', 'Berriozar',
    'Aranguren', 'Bera', 'San Adrián', 'Lodosa', 'Castejón' , 'Lerín'
]

TIPOS = ['gimnasios', 'polideportivos']

QUERIES = [f"{tipo} en {municipio}, Navarra" for municipio in MUNICIPIOS for tipo in TIPOS]


def setup_database():
    try:
        conn = mysql.connector.connect(
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password']
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
        cursor.execute(f"USE {DB_CONFIG['database']}")
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS gimnasios (
                place_id VARCHAR(100) PRIMARY KEY,
                nombre VARCHAR(255),
                direccion VARCHAR(255),
                latitud DECIMAL(10, 8),
                longitud DECIMAL(11, 8),
                estado_negocio VARCHAR(50),
                abierto_ahora BOOLEAN,
                puntuacion FLOAT,
                total_reseñas INT,
                tipos TEXT,
                foto_referencia TEXT,
                categoria_busqueda VARCHAR(50)
            )
        ''')
        conn.commit()
        return conn
    except mysql.connector.Error as err:
        print(f"Error de conexión a MySQL: {err}")
        exit()

def buscar_y_guardar(query, connection):
    cursor = connection.cursor()
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    
    params = {
        'query': query,
        'key': API_KEY
    }
    
    total_obtenidos = 0
    paginas_maximas = 3 
    
    for i in range(paginas_maximas):
        print(f"Solicitando página {i+1} para: '{query}'...")
        response = requests.get(url, params=params).json()
        

        if response.get('status') != 'OK' and response.get('status') != 'ZERO_RESULTS':
            print(f" Atención: Estado de la API: {response.get('status')}")
            
        resultados = response.get('results', [])
        
        for item in resultados:
            lat = item.get('geometry', {}).get('location', {}).get('lat')
            lng = item.get('geometry', {}).get('location', {}).get('lng')
            abierto_ahora = item.get('opening_hours', {}).get('open_now')
            tipos_str = ", ".join(item.get('types', []))
            
            fotos = item.get('photos', [])
            foto_ref = fotos[0].get('photo_reference') if fotos else None
            
            sql = """INSERT IGNORE INTO gimnasios 
                     (place_id, nombre, direccion, latitud, longitud, estado_negocio, 
                     abierto_ahora, puntuacion, total_reseñas, tipos, foto_referencia, categoria_busqueda) 
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                     
            valores = (
                item.get('place_id'),
                item.get('name'),
                item.get('formatted_address'),
                lat,
                lng,
                item.get('business_status'),
                abierto_ahora,
                item.get('rating', 0),
                item.get('user_ratings_total', 0),
                tipos_str,
                foto_ref,
                query.split(' ')[0] # Extrae "gimnasios" o "polideportivos"
            )
            
            cursor.execute(sql, valores)
            total_obtenidos += 1
            
        connection.commit()
        
        next_token = response.get('next_page_token')
        if not next_token:
            break 
        
        print("Esperando 4 segundos para activar el next_page_token...")
        time.sleep(4) 
        
        params = {'pagetoken': next_token, 'key': API_KEY}

    print(f"Finalizado: {total_obtenidos} registros procesados para '{query}'.\n")


if __name__ == "__main__":
    db_conn = setup_database()
    
    print(f"Iniciando volcado masivo... Se ejecutarán {len(QUERIES)} búsquedas.")
    for q in QUERIES:
        buscar_y_guardar(q, db_conn)
        
    db_conn.close()
    print("\n¡Proceso completado con éxito!")