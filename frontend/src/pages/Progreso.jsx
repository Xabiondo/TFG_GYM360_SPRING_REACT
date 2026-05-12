import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// Importamos solo lo del peso
import { getPesoHistorial, registrarPeso } from '../services/progresoService';
import './Progreso.css';

const Progreso = () => {
    // 1. Estados
    const [pesos, setPesos] = useState([]);
    const [inputPeso, setInputPeso] = useState("");
    
    // Sacamos la fecha de hoy para ponerla por defecto en el selector
    const fechaActual = new Date();
    const añoHoy = fechaActual.getFullYear();
    
    let mesHoy = fechaActual.getMonth() + 1;
    if (mesHoy < 10) {
        mesHoy = "0" + mesHoy;
    }
    
    let diaHoy = fechaActual.getDate();
    if (diaHoy < 10) {
        diaHoy = "0" + diaHoy;
    }
    const hoyString = añoHoy + "-" + mesHoy + "-" + diaHoy;

    // Estado para la fecha elegida
    const [inputFecha, setInputFecha] = useState(hoyString);

    // 2. Pillamos el usuario
    const userString = localStorage.getItem("user");
    let user = null;
    if (userString !== null) {
        user = JSON.parse(userString);
    }

    // 3. Cargar historial al inicio
    useEffect(() => {
        const cargarDatos = async () => {
            if (user !== null && user.id !== undefined) {
                const datosPeso = await getPesoHistorial(user.id);
                setPesos(datosPeso);
            }
        };
        cargarDatos();
    }, []);

    // 4. Guardar un nuevo peso
    const handlePeso = async () => {
        if (inputPeso === "") {
            return; // Si no hay peso, no hacemos nada
        }
        if (inputFecha === "") {
            return; // Si no hay fecha, no hacemos nada
        }
        
        // Enviamos el usuario, el peso y la FECHA elegida
        await registrarPeso(user.id, inputPeso, inputFecha);
        
        // Recargamos los datos para que la gráfica se actualice
        const nuevosPesos = await getPesoHistorial(user.id);
        setPesos(nuevosPesos);
        
        // Vaciamos la cajita del peso
        setInputPeso("");
    };

    // 5. Calcular peso actual (el último de la lista)
    let pesoActual = "?";
    if (pesos.length > 0) {
        const ultimoIndice = pesos.length - 1;
        pesoActual = pesos[ultimoIndice].peso;
    }

    return (
        <div className="pg-wrapper">
            <Navbar />
            <div className="pg-container">

                {/* TARJETA 1: REGISTRAR PESO */}
                <div className="pg-card">
                    <h2>Control de Peso</h2>
                    <div className="pg-stats-grid">
                        <div className="pg-stat-box">
                            <span>Peso Actual</span>
                            <strong>{pesoActual} kg</strong>
                        </div>
                    </div>

                    <div className="pg-actions">
                        <div className="pg-input-peso">
                            <input
                                type="date"
                                value={inputFecha}
                                onChange={(e) => setInputFecha(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Ej: 75.5..."
                                value={inputPeso}
                                onChange={(e) => setInputPeso(e.target.value)}
                            />
                            <button onClick={handlePeso}>Guardar</button>
                        </div>
                    </div>
                </div>

                {/* TARJETA 2: GRÁFICA */}
                <div className="pg-card">
                    <h2>Tu Evolución</h2>
                    <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                        <ResponsiveContainer>
                            <LineChart data={pesos} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#272a30" vertical={false} />
                                <XAxis 
                                    dataKey="fecha" 
                                    stroke="#a1a1aa" 
                                    fontSize={12} 
                                    tickMargin={10}
                                    tickFormatter={(str) => {
                                        const partes = str.split('-');
                                        if (partes.length === 3) {
                                            return partes[2] + "/" + partes[1]; // Pone "Dia/Mes"
                                        } else {
                                            return str;
                                        }
                                    }}
                                />
                                <YAxis 
                                    stroke="#a1a1aa" 
                                    fontSize={12} 
                                    domain={['dataMin - 2', 'dataMax + 2']} 
                                    tickFormatter={(val) => val + " kg"}
                                    tickMargin={10}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#181a20', borderColor: '#272a30', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--acent)', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#a1a1aa', marginBottom: '5px' }}
                                    formatter={(value) => [value + " kg", 'Peso']}
                                    labelFormatter={(label) => "Fecha: " + label}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="peso"
                                    stroke="var(--acent)"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: '#181a20', stroke: 'var(--acent)', strokeWidth: 2 }}
                                    activeDot={{ r: 6, fill: 'var(--acent)', stroke: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Progreso;