import React from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  busqueda, setBusqueda, 
  filtroAbierto, setFiltroAbierto,
  filtroUbicacion, setFiltroUbicacion,
  operadorPrecio, setOperadorPrecio,
  valorPrecio, setValorPrecio,

  mostrarAbierto = true,
  mostrarUbicacion = true, 
  mostrarPrecio = true,

  placeholderBusqueda = "Buscar...",
  textoOpcionTodos = "Todos",
  textoOpcionAbiertos = "Abiertos ahora"
}) => {
  return (
    <div className="search-container">

      {/* 1. Buscador principal */}
      <input
        type="text"
        className="search-input main-search"
        placeholder={placeholderBusqueda} // Usamos el prop aquí
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 2. Filtro de Abiertos (con interruptor por si queremos ocultarlo) */}
      {mostrarAbierto && (
        <select
          className="search-select"
          value={filtroAbierto}
          onChange={(e) => setFiltroAbierto(e.target.value)}
        >
          <option value="todos">{textoOpcionTodos}</option> {/* Usamos el prop aquí */}
          <option value="abiertos">{textoOpcionAbiertos}</option> {/* Usamos el prop aquí */}
        </select>
      )}

      {/* 3. Filtro de Ubicación */}
      {mostrarUbicacion && (
        <input
          type="text"
          className="search-input"
          placeholder="Ubicación (Ej: Centro...)"
          value={filtroUbicacion}
          onChange={(e) => setFiltroUbicacion(e.target.value)}
        />
      )}

      {/* 4. Filtro de Precio */}
      {mostrarPrecio && (
        <div className="price-group">
          <select
            className="search-select price-operator"
            value={operadorPrecio}
            onChange={(e) => setOperadorPrecio(e.target.value)}
          >
            <option value="menor">Menor a</option>
            <option value="igual">Igual a</option>
            <option value="mayor">Mayor a</option>
          </select>
          
          <input
            type="number"
            className="search-input price-value"
            placeholder="Precio €"
            value={valorPrecio}
            onChange={(e) => setValorPrecio(e.target.value)}
            min="0"
          />
        </div>
      )}

    </div>
  );
};

export default SearchBar;