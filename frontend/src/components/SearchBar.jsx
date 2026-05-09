import React from 'react';
import './SearchBar.css';

const SearchBar = ({ busqueda, setBusqueda, filtroAbierto, setFiltroAbierto }) => {
  return (
    <div className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="Buscar gimnasio por nombre o zona..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        className="search-select"
        value={filtroAbierto}
        onChange={(e) => setFiltroAbierto(e.target.value)}
      >
        <option value="todos">Todos los gimnasios</option>
        <option value="abiertos">Solo abiertos ahora</option>
      </select>
    </div>
  );
};

export default SearchBar;