import os
import mysql.connector
import time
import re
import random
import logging
from icrawler.builtin import BingImageCrawler

# --- CONFIGURACIÓN ---
DB_CONFIG = {
    "host": "localhost",
    "port": 3308,           
    "user": "root",
    "password": "root", 
    "database": "tfg_xabi" 
}

# Ruta para Spring Boot
RUTA_DESTINO = "src/main/resources/static/images/gimnasios"

# Creamos la carpeta si no existe
os.makedirs(RUTA_DESTINO, exist_ok=True)

def limpiar_texto(texto):
    """Limpia el nombre para que el buscador no se líe"""
    texto_limpio = re.sub(r'[^a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚ]', '', texto)
    return texto_limpio.strip()

def main():
    print("🚀 Iniciando el buscador Ninja con BING...")
    
    try:
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor(dictionary=True)
    except Exception as e:
        print(f"❌ Error conectando a la base de datos: {e}")
        return

    # Sacamos los gimnasios
    cursor.execute("SELECT place_id, nombre FROM gimnasios")
    gimnasios = cursor.fetchall()

    for gym in gimnasios:
        id_gym = gym['place_id']
        nombre = gym['nombre']
        nombre_limpio = limpiar_texto(nombre)
        nombre_archivo = f"gym_{id_gym}.jpg"
        ruta_final = os.path.join(RUTA_DESTINO, nombre_archivo)

        # Si ya existe la foto, nos la saltamos para no perder tiempo
        if os.path.exists(ruta_final):
            print(f"⏩ Saltando {nombre} (ya tiene foto)")
            continue

        print(f"\n🔍 Buscando en Bing: {nombre_limpio}...")

        # Configuramos el crawler de Bing
        # storage indica dónde guarda temporalmente
        crawler = BingImageCrawler(
            storage={'root_dir': RUTA_DESTINO},
            log_level=logging.ERROR # Para que no salgan mil mensajes por consola
        )

        try:
            # Buscamos y descargamos la primera
            crawler.crawl(keyword=f"{nombre_limpio} gimnasio fachada", max_num=1)
            
            # BingImageCrawler guarda la foto como "000001.jpg" o ".png"
            # Vamos a buscar ese archivo para renombrarlo al nuestro
            foto_descargada = None
            for ext in ['.jpg', '.png', '.jpeg']:
                temp_path = os.path.join(RUTA_DESTINO, f"000001{ext}")
                if os.path.exists(temp_path):
                    foto_descargada = temp_path
                    break

            if foto_descargada:
                # Renombramos el archivo al ID del gimnasio
                if os.path.exists(ruta_final): os.remove(ruta_final)
                os.rename(foto_descargada, ruta_final)
                
                # Actualizamos la Base de Datos
                ruta_para_bd = f"/images/gimnasios/{nombre_archivo}"
                cursor.execute(
                    "UPDATE gimnasios SET foto_referencia = %s WHERE place_id = %s",
                    (ruta_para_bd, id_gym)
                )
                conexion.commit()
                print(f"  [✓] ¡Éxito! Guardado como: {ruta_para_bd}")
            else:
                print(f"  [-] No se encontró ninguna imagen para {nombre_limpio}")

        except Exception as e:
            print(f"  [X] Error buscando {nombre}: {e}")

        # Pausa aleatoria para no ser bloqueados
        tiempo_espera = random.uniform(3.0, 6.0)
        print(f"  ⏳ Esperando {tiempo_espera:.1f}s...")
        time.sleep(tiempo_espera)

    cursor.close()
    conexion.close()
    print("\n✅ Tarea finalizada. Revisa la carpeta de Spring Boot.")

if __name__ == "__main__":
    main()