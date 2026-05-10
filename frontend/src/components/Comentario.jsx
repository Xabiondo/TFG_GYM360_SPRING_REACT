import React from 'react';
import './Comentario.css';

const Comentario = ({ rutaFoto, nombreUsuario, comentario }) => {

    const nombreSeguro = nombreUsuario || "Usuario Anónimo";

    const inicial = nombreSeguro.charAt(0).toUpperCase();

    return (
        <div className="comentario-card">
            <div className="comentario-avatar-wrapper">
                {rutaFoto ? (
                    <img 
                        src={rutaFoto} 
                        alt={`Avatar de ${nombreSeguro}`} 
                        className="comentario-avatar" 
                    />
                ) : (
                    <div className="comentario-avatar-placeholder">
                        {inicial}
                    </div>
                )}
            </div>
            
            <div className="comentario-contenido">
                <h4 className="comentario-autor">{nombreSeguro}</h4>
                <p className="comentario-texto">{comentario}</p>
            </div>
        </div>
    );
};

export default Comentario;